import json

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .gateway import MpesaGateWay
from .serializers import TransactionSerializer, STKCheckoutSerializer


class MpesaCheckout(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = STKCheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        express = MpesaGateWay()
        response = express.stk_push(request=request, **serializer.validated_data)
        return Response(response)


class MpesaCallBack(APIView):
    permission_classes = (AllowAny, )

    def get(self):
        return Response({"status": "OK"}, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.body
        express = MpesaGateWay()
        response = express.callback_handler(json.loads(data))
        return Response(TransactionSerializer(response).data, status=status.HTTP_200_OK)

