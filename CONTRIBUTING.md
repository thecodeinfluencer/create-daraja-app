# Contributing

Contributions are always welcome especially adding the available templates.

Run `npm install` then `node .` to run the project locally.

## Format

You can add to the teplates folder an API with the following endpoints:

-   `/api/example/stk` - A `POST` endpoint that Handles the STK push and takes in `phone` and `amount` in the request body.
-   `/api/example/callback` - A `POST` endpoint that acts as a hook to listen to callbacks from the Daraja platform.
-   Make sure to add a `README.md` file with instructions on how to setup the project.
