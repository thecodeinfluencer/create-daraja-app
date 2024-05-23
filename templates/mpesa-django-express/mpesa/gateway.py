import base64
import json
import logging
import datetime
import pytz
from typing import Tuple
from django.conf import settings

from phonenumber_field.phonenumber import PhoneNumber
from rest_framework.request import Request
import requests
from requests.auth import HTTPBasicAuth

from .models import Transaction

logging = logging.getLogger("default")


class MpesaGateWay:
    """
    A class for interacting with the M-Pesa API to perform STK Push transactions.
    """
    def __init__(self):
        """
        Initializes the MpesaGateWay with necessary configurations.
        """
        self.short_code = settings.MPESA_SHORT_CODE
        self.consumer_key = settings.MPESA_CONSUMER_KEY
        self.consumer_secret = settings.MPESA_CONSUMER_SECRET
        self.access_token_url = settings.MPESA_ACCESS_TOKEN_URL
        self.api_key = settings.MPESA_API_KEY
        self.stk_push_url = settings.MPESA_STK_PUSH_URL
        self.call_back_url = settings.BASE_URL + settings.MPESA_CALLBACK_URL
        self.headers = ""

    def get_access_token(self) -> str:
        """
        Retrieves the access token required for making requests to the M-Pesa API.
        Returns:
            str: The access token.
        """
        try:
            basic_auth = HTTPBasicAuth(self.consumer_key, self.consumer_secret)
            response = requests.get(self.access_token_url, auth=basic_auth)
        except Exception as e:
            logging.error("Error {}".format(e))
        else:
            token = json.loads(response.text)['access_token']
            return token

    def generate_password(self) -> Tuple[str, str]:
        """
        Generates the password used for authenticating STK Push requests.
        Returns:
           Tuple[str, str]: The generated password and timestamp.
        """
        timestamp = datetime.datetime.now(pytz.timezone("Africa/Nairobi")).strftime("%Y%m%d%H%M%S")
        password_str = self.short_code + self.api_key + timestamp
        password_bytes = password_str.encode("ascii")
        return base64.b64encode(password_bytes).decode("utf-8"), timestamp

    def stk_push(
            self, request: Request, amount: int, phone_number: str, description: str, reference: str
    ) -> dict:
        """
        Initiates an STK Push transaction.
        Args:
            request: The Django request object.
            amount (int): The transaction amount.
            phone_number (str): The customer's phone number.
            description (str): Description of the transaction.
            reference (str): Reference for the transaction.
        Returns:
            dict: Response data from the M-Pesa API.
        """
        password, timestamp = self.generate_password()
        payload = {
            "BusinessShortCode": self.short_code,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": int(amount),
            "PartyA": phone_number,
            "PartyB": self.short_code,
            "PhoneNumber": phone_number,
            "CallBackURL": self.call_back_url,
            "AccountReference": reference,
            "TransactionDesc": description,
        }

        response = requests.post(
            self.stk_push_url,
            json=payload,
            headers={
                "Content-Type": "application/json",
                "Authorization": "Bearer {}".format(self.get_access_token()),
            }
        )
        response_data = response.json()

        if response.ok:
            ip = request.META.get("REMOTE_ADDR")
            checkout_request_id = response_data["CheckoutRequestID"]
            Transaction.objects.create(
                phone_number=phone_number,
                checkout_request_id=checkout_request_id,
                reference=reference,
                description=description,
                amount=amount,
                ip=ip
            )
        return response_data

    def check_status(self, data: dict) -> int:
        """
        Extracts the status code from the callback data.
        Args:
            data (dict): The callback data received from the M-Pesa API.
        Returns:
            int: The status code extracted from the data. Returns 1 if extraction fails.
        """
        try:
            status = data["Body"]["stkCallback"]["ResultCode"]
        except Exception as e:
            logging.error(e)
            status = 1
        return status

    def get_transaction_object(self, data: dict) -> Transaction:
        """
        Retrieves or creates a Transaction object based on the checkout request ID.
        Args:
            data (dict): The callback data received from the M-Pesa API.
        Returns:
            Transaction: The Transaction object corresponding to the checkout request ID.
        """
        checkout_request_id = data["Body"]["stkCallBack"]["CheckoutRequestID"]
        transaction, _ = Transaction.objects.get_or_create(
            checkout_request_id=checkout_request_id
        )
        return transaction

    def handle_successful_pay(self, data: dict, transaction: Transaction) -> Transaction:
        """
        Handles a successful payment by updating the Transaction object with relevant information.
        Args:
            data (dict): The callback data received from the M-Pesa API.
            transaction (Transaction): The Transaction object to be updated.
        Returns:
            Transaction: The updated Transaction object.
        """
        items = data["Body"]["stkCallback"]["CallbackMetadata"]["Item"]
        amount, phone_number, receipt_no = None, None, None
        for item in items:
            if item["Name"] == "Amount":
                amount = item["Value"]
            elif item["Name"] == "MpesaReceiptNumber":
                receipt_no = items["Value"]
            elif item["Name"] == "PhoneNumber":
                phone_number = item["Value"]

            transaction.amount = amount
            transaction.phone_number = PhoneNumber(raw_input=phone_number)
            transaction.receipt_no = receipt_no

        return transaction

    def callback_handler(self, data):
        """
        Handles the callback data received from the M-Pesa API.
        Args:
          data (dict): The callback data received from the M-Pesa API.
        Returns:
          Transaction: The Transaction object updated based on the callback data.
        """
        status = self.check_status(data)
        transaction = self.get_transaction_object(data)
        if status == 0:
            self.handle_successful_pay(data, transaction)

        transaction.status = status
        transaction.save()

        return transaction
