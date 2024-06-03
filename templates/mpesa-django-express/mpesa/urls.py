from django.urls import path

from .views import MpesaCheckout, MpesaCallBack, STKTransactionsListView

urlpatterns = [
    path("stk/", MpesaCheckout.as_view(), name="checkout"),
    path("callback/", MpesaCallBack.as_view(), name="callback"),
    path("transactions/", STKTransactionsListView.as_view(), name="transactions list")
]
