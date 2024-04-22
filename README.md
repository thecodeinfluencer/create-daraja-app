# Create Daraja App

`create-daraja-app` is a user-friendly command line interface tool designed to streamline the process of setting up a [Daraja API](https://developer.safaricom.co.ke/APIs) with various frameworks with just a single command. By executing `npx create-daraja-app` and following the subsequent instructions, developers can effortlessly initiate a new Daraja project.

## Quick Overview

To initiate a Daraja project, simply run the command `npx create-daraja-app` and adhere to the prompts provided.

Note that ([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes bundled with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f)) and enables the execution of packages without the need for global installation.

## Project Structure

The command generates a project scaffold with an organized structure and includes two essential endpoints:

1. **`/api/example/stk` Endpoint:**

    - This endpoint serves as a crucial entry point for initiating STK (Sim Toolkit) push transactions.
    - It handles incoming requests containing `phone` and `amount` within the request body.

2. **`/api/example/callback` Endpoint:**

    - Operating as a callback hook, this endpoint enables our application to receive and process callbacks from the Daraja platform.
    - By listening to incoming POST requests, our application can promptly respond to relevant events and update transaction statuses as necessary.

## Supported Frameworks

Below is a list of supported frameworks. Kindly [contribute](./CONTRIBUTING.md) to add to the list.

-   [x] Node JS
-   [x] Next JS
-   [ ] Django
-   [ ] Ruby on Rails
-   [ ] Go

## Contributing

This project is in early stage and actively welcomes contributions from the developer community to enhance its functionality and robustness. A dedicated [`CONTRIBUTING.md`](./CONTRIBUTING.md) file outlines guidelines and best practices for anyone interested in contributing to the `create-daraja-app` project. Whether it's suggesting improvements, reporting issues, or submitting code contributions, community involvement is highly encouraged to foster collaboration.

Let's consolidate our efforts into one unified source (through a well-organized project, bootstrap, and readme) for generating MPesa Daraja APIs across various frameworks. This central resource encourages collaboration and contributions, eliminating the need for numerous scattered medium posts and guides.
