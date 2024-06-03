# <%= appname %>

A <%= api %> API built with `create-daraja-app` platform for <%= framework %>. This project was bootstrapped with `create-daraja-api`

## Setup

To setup your application

1. Create a virtual environment
```commandline
$ python3.10 -m venv <env name>
```
2. Install all the required dependancies
```commandline
$ pip install -r requirements.txt
```
3. Copy and update env file
Create a database. (I used postgresql for this)

```commandline
$ cp .env.example .env
```
#### M-PESA settings:
Provide details for`MPESA_CONSUMER_SECRET` , `MPESA_CONSUMER_KEY`, `MPESA_API_KEY`, `MPESA_SHORTCODE` in your env file. 

These are obtained from [Safaricom Developers' Portal: Daraja](https://developer.safaricom.co.ke/). 

Sign up and create an app new app under [My Apps](https://developer.safaricom.co.ke/MyApps) to obtain the credentials.

The application's  `ENVIRONMENT`  is defaults to `dev`. This will call the `sandbox.safaricom.co.ke` api.

If you want to access the production api(api.safaricom.co.ke), change the `ENVIRONMENT` to `production`.


#### Database settings:

Create a database. The application defaults to  `postgresql` driver.

If you want to use use another database update the `DATABASE_ENGINE`. Available options are `mysql`, `oracle`, `sqlite3` and `postgresql`.

Provide details for`DATABASE_HOST` , `DATABASE_NAME`,` DATABASE_USER`, `DATABASE_PASSWORD` , `DATABASE_PORT` in your env file. 

##### Other:
The applications `BASE_URL` defaults to `localhost:8000` . You might want to adjust that for other environments.
4. Run migrations
```commandline
$ python manage.py migrate
```

5. To start the project:
```commandline
$ python manage.py runserver
```
## API

This template exposes two api endpoints:

-   `/mpesa/stk` - A `POST` endpoint that Handles the STK push and takes in `phone` and `amount` in the request body.
-   `/mpesa/callback` - A `POST` endpoint that acts as a webhook to listen to callbacks from the Daraja platform.

### Prerequisites

1. Create an account on [Safaricom developers portal (Daraja)](https://developer.safaricom.co.ke/)
2. Create a new app under [My Apps](https://developer.safaricom.co.ke/MyApps) section ensuring to check all the fields. You will be able to see consumer key and consumer secret under each app
3. (Optional) Have `ngrok` installed - Use this to simulate https on our localhost server. 
4. Have Postman or any other API client testing tool installed

### Setup

1. Run `ngrok http 8000` in a terminal in the project root
2. `BASE_URL` with the https version of the link provided on the ngrok terminal in step 3
3. In Postman, create a `POST` request with the body containing the `phone` and `amount`
4. Press send and you should receive a push on your phone
