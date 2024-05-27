# frozen_string_literal: true

module Example
  # Merchant initiated request (C2B), sends a payment prompt on the customer's phone (Popularly known as STK Push Prompt)
  module Stk
    def stk
      phone = params[:phone]
      amount = params[:amount]

      unless phone && amount
        render json: { error: 'Missing required values' }, status: :not_found
        return
      end

      payload = generate_stkpush_payload(phone, amount)
      headers = generate_headers

      response = send_stkpush_request(payload, headers)
      render json: response
    end

    private

    # rubocop:disable Metrics/MethodLength
    def generate_stkpush_payload(phone, amount)
      {
        BusinessShortCode: @short_code,
        Password: @password,
        Timestamp: @timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: @short_code,
        PhoneNumber: phone,
        CallBackURL: "#{@callback_url}/api/example/callback",
        AccountReference: 'Example',
        TransactionDesc: 'Example'
      }.to_json
    end
    # rubocop:enable Metrics/MethodLength

    def send_stkpush_request(payload, headers)
      RestClient::Request.new(
        {
          method: :post,
          url: 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
          payload:,
          headers:
        }
      ).execute do |response, _request|
        handle_response(response)
      end
    end
  end
end