import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

class Transaction(models.Model):
    STATUS = ((0, "Complete"), (1, "Pending"), )

    transaction_no = models.CharField(default=uuid.uuid4, max_length=50, unique=True)
    phone_number = PhoneNumberField()
    checkout_request_id = models.CharField(max_length=200)
    reference = models.CharField(max_length=40, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    amount = models.CharField(max_length=10)
    status = models.CharField(max_length=10, choices=STATUS, default=1)
    receipt_no = models.CharField(max_length=200, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    ip = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        verbose_name = _("Transaction")
        verbose_name_plural = _("Transactions")
        ordering = ("-created",)
