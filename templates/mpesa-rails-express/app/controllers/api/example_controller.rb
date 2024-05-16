class Api::ExampleController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :load_variables

  include Example::Stk

  private

  def load_variables
    @consumer_key = ENV.fetch('MPESA_CONSUMER_KEY')
    @consumer_secret = ENV.fetch('MPESA_CONSUMER_SECRET')
    @short_code = ENV.fetch('MPESA_SHORTCODE')
    @passkey = ENV.fetch('MPESA_PASSKEY')
    @callback_url = ENV.fetch('MPESA_CALLBACK_URL')
    @timestamp = Time.now.strftime('%Y%m%d%H%M%S').to_s
    @password = Base64.strict_encode64("#{@short_code}#{@passkey}#{@timestamp}")
    @userpass = Base64.strict_encode64("#{@consumer_key}:#{@consumer_secret}")
  end

  def generate_access_token_request
    RestClient::Request.execute(
      url: 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      method: :get,
      headers: {
        Authorization: "Basic #{@userpass}"
      }
    )
  end

  def retrieve_access_token
    res = send_access_token_request
    raise MpesaError, 'Unable to generate access token' if res.code != 200

    body = JSON.parse(res, { symbolize_names: true })
    body[:access_token]
  end

  def send_access_token_request
    res = generate_access_token_request
    res.code == 200 ? res : generate_access_token_request
  end

  def generate_headers
    {
      Content_type: 'application/json',
      Authorization: "Bearer #{retrieve_access_token}"
    }
  end

  def handle_response(response)
    case response.code
    when 500, 400
      [:error, JSON.parse(response.to_str)]
    when 200
      [:success, JSON.parse(response.to_str)]
    else
      raise "Invalid response #{response.to_str} received."
    end
  end
end
