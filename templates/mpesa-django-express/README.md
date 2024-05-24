# <%= appname %>

A <%= api %> API built with `create-daraja-app` platform for <%= framework %>. This project was bootstrapped with `create-daraja-api`

## Setup

To setup your application

1. Create a virtual environment
```
$ python3.10 -m venv <env name>
```
2. Install all the required dependancies
```
$ pip install -r requirements.txt
```
3. Create a database. (I used postgresql for this)
4. Copy and update env file
```
$ cp .env.example .env
```
Update `consumer key`,  `consumer secret`, `apikey` and `short code` in your .env file.
