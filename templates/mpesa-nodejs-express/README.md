# <%= appname %>

A <%= api %> API built with `create-daraja-app` platform for <%= framework %>. This project was bootstrapped with `create-daraja-api`

## API Structure

The API exposes two endpoints:

- `/api/example/stk` - A `POST` endpoint that handles the STK push and takes in `phone` and `amount` in the request body.
- `/api/example/callback` - A `POST` endpoint that acts as a hook to listen to callbacks from the Daraja platform.

## Setup

### Prerequisites

1. Create an account on [Safaricom developers portal (Daraja)](https://developer.safaricom.co.ke/).
2. Create a new app under [My Apps](https://developer.safaricom.co.ke/MyApps) section ensuring to check all the fields. You will be able to see `consumer key` and `consumer secret` under each app.
3. Have [Node.js](https://nodejs.org/) installed.

### Test the app

```bash
$ cp .env.example .env
$ npm install
```

- Populate the `consumer key` and `consumer secret` into the `.env`.

```bash
$ npm run dev
```

- Send a `POST` request to `/api/example/stk` with the request body below:

```json
{
  "phone": 254700000000,
  "amount": 1
}
```

- The response will look like this:

```json
{
  "MerchantRequestID": "1c5b-4ba8-815c-ac45c57a3db0570513",
  "CheckoutRequestID": "ws_CO_17052024122600366799055101",
  "ResponseCode": "0",
  "ResponseDescription": "Success. Request accepted for processing",
  "CustomerMessage": "Success. Request accepted for processing"
}
```

### Callback

1. Have `ngrok` installed (or execute it directly via `npx ngrok http 8000` in a terminal in the project root). You might consider other tunneling options such as [localtunnel-www](https://theboroer.github.io/localtunnel-www/) or [localhost.run](https://localhost.run/) if ngrok is not working for you.

> [!NOTE]
> We use these to simulate https and hosting on our localhost server since callback URLs are required to be HTTPS and we need to host our site for Daraja to be able to send the request to our app.

2. Replace the `CALLBACK_URL` in the `.env` with the https version of the link provided on the ngrok terminal in the previous step.
3. Rerun the project to pick up the new `CALLBACK_URL` in the `.env`.
4. Resend the request and action on the prompt sent to your phone. A console log with the callback info like below.

> [!NOTE]
> For the sandbox apps, the callback from Daraja is usually intermitent and may not work. For live apps, it performs better.

```json
{
  "MerchantRequestID": "29115-34620561-1",
  "CheckoutRequestID": "ws_CO_191220191020363925",
  "ResultCode": 0,
  "ResultDesc": "The service request is processed successfully.",
  "CallbackMetadata": {
    "Item": [
      {
        "Name": "Amount",
        "Value": 1.0
      },
      {
        "Name": "MpesaReceiptNumber",
        "Value": "NLJ7RT61SV"
      },
      {
        "Name": "TransactionDate",
        "Value": 20191219102115
      },
      {
        "Name": "PhoneNumber",
        "Value": 254700000000
      }
    ]
  }
}
```
