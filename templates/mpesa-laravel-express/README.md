# <%= appname %>

A <%= api %> API built with `create-daraja-app` platform for <%= framework %>. This project was bootstrapped with `create-daraja-api`

## Setup

You can run these commands to setup your application

```
$ cp .env.example .env
$ composer install
$ php artisan key:generate
$ php artisan migrate
$ npm install
$ npm run dev
$ php artisan serve
```

You also need to set a `consumer key`, `consumer secret`, `passkey` and `short code` in your .env file.

By default, the application's environment is set to `sandbox`. This will call the `sandbox.safaricom.co.ke` api.

If you want to access the production api(api.safaricom.co.ke), change the environment to `production`.

You might also want to update the `APP_URL` to use https as Laravel will build urls using the `APP_URL` as the base url.

If you want to integrate Mpesa within `an existing laravel application`, you might consider using the [Laravel Mpesa Package](https://github.com/Iankumu/mpesa) instead.

## API

This template exposes two api endpoints:

-   `/api/example/stk` - A `POST` endpoint that Handles the STK push and takes in `phone` and `amount` in the request body.
-   `/api/example/callback` - A `POST` endpoint that acts as a webhook to listen to callbacks from the Daraja platform.

## Extending functionality

### Prerequisites

1. Create an account on [Safaricom developers portal (Daraja)](https://developer.safaricom.co.ke/)
2. Create a new app under [My Apps](https://developer.safaricom.co.ke/MyApps) section ensuring to check all the fields. You will be able to see consumer key and consumer secret under each app
3. Have `composer` and `php` installed.
4. (Optional) Have `ngrok` installed - Use this to simulate https on our localhost server. You might consider other tunneling options such as [local tunnel](https://theboroer.github.io/localtunnel-www/) or [Localhost.run](https://localhost.run/) if ngrok is not working for you.
5. Have Postman or any other API client testing tool installed

### Setup

1. Run `ngrok http 8000` in a terminal in the project root
2. Fill in the `.env` with the necessary information. Replace the `APP_URL` with the https version of the link provided on the ngrok terminal in step 1.
3. Start the project by running `php artisan serve`
4. In Postman, create a `POST` request with the body containing the `phone` and `amount`
5. Press send and you should receive a push on your phone
