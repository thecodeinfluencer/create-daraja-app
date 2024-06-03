from django.contrib import admin

from .models import Transaction

@admin.register(Transaction)
class TransactionModelAdmin(admin.ModelAdmin):
    list_display = ("transaction_no", "phone_number", "checkout_request_id", "amount", "receipt_no", "status", "created")
    list_filter = ("status", )
    search_fields = ("phone_number", "transaction_no")
