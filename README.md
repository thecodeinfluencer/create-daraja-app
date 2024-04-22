# Create Daraja App

`create-daraja-app` is a command line interface tool used to bootstrap a Daraja API for different frameworks with a single command.

## Quick Overview

To create the project, run `npx create-daraja-app` and follow the instructions.

([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))

## Project structure

The command generates a project that when run, exposes two endpoints:

-   `/api/example/stk` - A `POST` endpoint that Handles the STK push and takes in `phone` and `amount` in the request body.
-   `/api/example/callback` - A `POST` endpoint that acts as a hook to listen to callbacks from the Daraja platform.

## Contributing

We'd love your help with the `create-daraja-app` project! See [CONTRIBURTING.md](./CONTRIBUTING.md)
