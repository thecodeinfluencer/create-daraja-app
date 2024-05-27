# frozen_string_literal: true

module Example
  module Callback

    def callback
      checkout_request_id = params[:checkout_request_id]

      unless checkout_request_id
        render json: { error: 'Missing required values' }, status: :not_found
        return
      end

      payload = generate_query_payload(checkout_request_id)

      headers = generate_headers

      response = send_query_request(payload, headers)
      render json: response
    end

    private

    def generate_query_payload(checkout_request_id)
      {
        BusinessShortCode: @short_code,
        Password: @password,
        Timestamp: @timestamp,
        CheckoutRequestID: checkout_request_id
      }.to_json
    end

    def send_query_request(payload, headers)
      RestClient::Request.new(
        {
          method: :post,
          url: 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query',
          payload:,
          headers:
        }
      ).execute do |response, _request|
        handle_response(response)
      end
    end

  end
end