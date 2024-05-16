# <%= appname %>

A <%= api %> API built with `create-daraja-app` platform for <%= framework %>. This project was bootstrapped with `create-daraja-api`

## Setup

-   Run `bundle` on the root of this project to install dependencies.
-   Run `rails s` to start the project

## API

The API exposes two endpoints:

-   `/api/example/stk` - A `POST` endpoint that Handles the STK push and takes in `phone` and `amount` in the request body.

## Extending functionality

### Prerequisites

1. Create an account on [Safaricom developers portal (Daraja)](https://developer.safaricom.co.ke/)
2. Create a new app under [My Apps](https://developer.safaricom.co.ke/MyApps) section ensuring to check all the fields. You will be able to see consumer key and consumer secret under each app
3. Have `ruby` installed
4. Have `ngrok` installed - Checkout installation guides on their page [here](https://ngrok.com/download).
5. Have Postman or any other API testing tool installed

### Setup

1. Run `ngrok http 3000` in a terminal in the project root
2. Fill in the `.env` with the following information.
```
  MPESA_CONSUMER_KEY='<your app consumer key>'
  MPESA_CONSUMER_SECRET='<your app consumer secret>''
  MPESA_SHORTCODE=174379
  MPESA_PASSKEY='<your passkey>'
  MPESA_CALLBACK_URL='<ngrok url>'
```
NB: The `MPESA_SHORTCODE` is only for testing to go live get a sortcode from mpesa.
3. Replace the `MPESA_CALLBACK_URL` with the https version of the link provided on the ngrok terminal in step.
4. Start the project by running `rails s`
5. In Postman, create a `POST` request with the body containing the `phone` and `amount`
6. Press send and you should receive a push on your phone
