from django.db.models import Q
from .models import Transaction

def transactions_list(filters=None) :
    filters = filters or {}

    search_term = filters.get('search', None)
    qs = Transaction.objects.order_by("-created",)
    if search_term:
        query = Q()
        search_fields = ["transaction_no", "checkout_request_id", "receipt_no"]
        for field in search_fields:
            query |= Q(**{field+'__icontains': search_term})
        qs = qs.filter(query)
    return qs
