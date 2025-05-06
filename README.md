# Custom Leaderboard

This is a sample application that demonstrates how to create a custom leaderboard with your GoFundMe Pro data. It should be used purely as instructional material rather than a production-ready application. A great [support article](https://support.classy.org/s/article/building-fundraising-leaderboards-with-the-classy-api) further outlines and walks through what this application achieves.

Please refer to GoFundMe Pro's [developer documentation](https://developers.classy.org/overview/welcome) for more information about how to work with our product.

This application shell makes use of a
[Node backend layer](https://nodejs.org/en) to handle requests between the application and GoFundMe Pro's API as well as a [React frontend](https://react.dev/) to create a Client for the data retrieved from the customer's GoFundMe Pro account.

You can find the backend layer in the
`/server` folder and the frontend part of the application in
the `/client` folder.

### Server: Node Server

The [Server](./server) folder leverages the [Express framework](https://expressjs.com/) as well as [Nodemon](https://nodemon.io/) to simplify development.

### Client: React SPA

The [Client folder](./client) contains the React SPA to display the data retrieved from GoFundMe Pro's API by the backend.

### Setup / Local Development

1. Ensure you have [NVM](https://github.com/nvm-sh/nvm) installed.
2. Ensure you have [yarn](https://yarnpkg.com/getting-started) installed.
3. Copy the environment variables from `.template.env` to a new `.env` file in the root of the server directory, adding in the values that correlate with your organization, campaign, and authentication credentials.
4. Run the following commands from the root of this app to set up the project:

```
$ nvm use
$ yarn install:all
$ yarn start:local
```

`nvm use` will assure that you are using the latest stable version of Node.
`yarn install:all` will install all of the dependencies the root application and subdirectories need to run.
`yarn start:local` will run both the server and client applications in parallel.

_NOTE:_
React's strict mode can cause double renders and, thus, duplicate requests to the backend. For local development, you may want to remove the React.StrictMode wrapper around the React app in `index.tsx`.

### Troubleshooting NVM / Yarn Versions

If you encounter issues with `yarn` following the `nvm use` command, you may need to reinstall `yarn` for the new node version:

```
$ npm install -g yarn
```
