# Custom Leaderboard

This is a sample application that demonstrates how to create a custom leaderboard with your Classy data. It should be used purely as instructional material rather than a production-ready application. A great [support article](https://support.classy.org/s/article/building-fundraising-leaderboards-with-the-classy-api) further outlines and walks through what this application achieves. 

Please refer to Classy's [developer documentation](https://developers.classy.org/overview/welcome) for more information about how to work with our product.

This application shell makes use of a
[Node backend layer](https://nodejs.org/en) to handle requests between the application and Classy's API as well as a [React frontend](https://react.dev/) to create a UI for the data retrieved from the customer's Classy account.

You can find the backend layer in the
`/server` folder and the frontend part of the application in
the `/ui` folder.

### Server: Node Server

The [Server](./server) folder leverages the [Express framework](https://expressjs.com/) as well as [Nodemon](https://nodemon.io/) to simplify development.

### UI: SPA

The [UI folder](./ui) contains the React SPA to display the data retrieved from Classy's API by the backend.

### Local Development

To get started, this application contains two key directories: Server and UI. 
Add the appropriate variables to the `.env` file in the server directory that correlate with your organization, campaign, and authentication credentials.

`cd` into the `server` and `ui` directories before running `nvm use` and `yarn` to install the package dependencies. `cd..` back to the root of the applications and run `yarn start:local` to run the server and client applications in parallel. Both directories will listen to changes and reload the app, applying those changes when they are saved. 
