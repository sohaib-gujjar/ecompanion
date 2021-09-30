# Team Messenger App (Slack Clone)

An example project, to connect with friends and colleagues. It contains both server side and client side modules.
Server (RestApis) is developed using ExpressJS framework and UI is developed in React. Main features of app are

- Backend
    -   Rest endpoints
    -   Persistance storage in MySQL
    -   Object Relational Mapping by TypeORM
    -   Database migrations
    -   Data validation
    -   User authentication
    -   Exception handling middleware
    -   Swagger Documentation
    -   Jest - JavaScript Testing Framework ..
- Frontend UI
    -   Forms validation
    -   Create react components using classes and hooks
    -   React Context
    -   React Bootstrap & Saas styling (style variables ...)
    -   Home page
    -   Dashboard to see chats and send messages, 
    -   Registration form
    -   SignIn form
    
### Getting started

To get the Node server running locally:

- Clone this repo
- Run the following commands to install all required dependencies, for both client and server project directory.
```sh
cd node-ecomapanion-server && npm install
cd react-ecompanion-app && npm install
```
- Before starting backend you need to create database and update database credentials to `ormconfig.js` and then run migrations.
```sh
cd  node-ecomapanion-server/ 
- npm run migrate:run
- npm run start
```
-   In the frontend and backend directory, you can run: `npm run start` to run the app in the development mode.
-   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
-   Create the user account and start messaging.

## Swagger Documentation
- see the api documentation at [http://localhost:3001/doc/](http://localhost:3001/doc/)

### Home page
![Alt text](https://github.com/sohaib-gujjar/ecompanion/blob/master/react-ecompanion-app/public/home.png "Optional Title")
### Dashboard
![Alt text](https://github.com/sohaib-gujjar/ecompanion/blob/master/react-ecompanion-app/public/dashboard.png "Optional Title")
### Sign Up page
![Alt text](https://github.com/sohaib-gujjar/ecompanion/blob/master/react-ecompanion-app/public/register.png "Optional Title")
### Sign In page
![Alt text](https://github.com/sohaib-gujjar/ecompanion/blob/master/react-ecompanion-app/public/login.png?raw=true "Optional Title")
### Profile page
![Alt text](https://github.com/sohaib-gujjar/ecompanion/blob/master/react-ecompanion-app/public/profile.png?raw=true "Optional Title")


## Application Structure

### Backend

```txt
server /
    |---- src/
        |---- @base                     // common classes, exception handler, middleware, db migrations
        |---- modules                   // model, controller, services
            |---- model                 // model classes / database entities
                |---- user.entity.ts    // user model
            |---- service               // provider classes
                |---- user.service.ts   // provide business logic to users
            |---- controller/			         
                |---- user.router.ts    // NodeJS endpoints for user entity
                |---- index.ts			// Register all express controller
        |---- index.ts                  // express server configuration and starts listen
    |---- .env		                    // Environment variables
    |---- package.json		            // node package configuration
    |---- tsconfig.json		            // typescript configuration file
    |---- ormconfig.js	                // mysql server configuration file
```

##### Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [typeorm](https://github.com/typeorm/typeorm)
- [mysql](www.mysql.com/downloads)
- [lodash](https://lodash.com/) - Array handling
- [dotenv]: module that loads environment variables from a .env file
- [ts-loader]: A TypeScript loader for webpack
- [passport]: user authentication
- [express-session]: storing session on server


### Frontend

```txt
react-ecompanion-app /
    |---- src/
        |---- index.js		        // start page of react app
        |---- App.js		        // Start point of react application, implementation of `Routes`
        |---- context/
            |---- UserContext.js    // User context
        |---- pages/			    // pages
            |---- Home.js           // Home page
            |---- Dashboard.js      // Messaging window
        |---- forms/
            |---- SignUp.js		    // register user form, with input validation
            |---- SignIn.js		    // login user form, with input validation
        |---- components/			// small components
            |---- Header.js		    // app header and menu
            |---- UserInfo.js		// menu
            |---- formikcomponents/		// text input, textarea, dropdown, image uploader, multiple files uploader
        |---- styles	            // home, dashboard, forms styles
            |---- App.scss	        // app css
    |---- .env		                // enviroment variables
    |---- public/index.html		    // index page for react app
    |---- package.json		        // package configuration
```
