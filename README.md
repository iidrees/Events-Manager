# Events-Manager

[![Build Status](https://travis-ci.org/iidrees/Events-Manager.svg?branch=develop)](https://travis-ci.org/iidrees/Events-Manager)
[![Coverage Status](https://coveralls.io/repos/github/iidrees/Events-Manager/badge.svg?branch=develop)](https://coveralls.io/github/iidrees/Events-Manager?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/507b075d1aa0f1e22e24/maintainability)](https://codeclimate.com/github/iidrees/Events-Manager/maintainability)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![codecov](https://codecov.io/gh/iidrees/Events-Manager/branch/develop/graph/badge.svg)](https://codecov.io/gh/iidrees/Events-Manager)

## Getting Started

This is a javascript application built with **Express** framework on the **nodejs** platform. Authentication of users is done via **JSON Web Tokens**.
To view the UI template for the Events-Manager web application on Github Pages, you should click on this link [Events-Manager](https://iidrees.github.io/Events-Manager/template/landing.html).

To get more information on how to use the API, a good place to start would be here: [Events-Manager Doc](https://events-manager-cp.herokuapp.com/api-docs/) on swaggerhub.

## Installation and Starting

1.  Install [**Node JS**](https://nodejs.org/en/)

    > If you are a **windows OS** user follow the instructions in this link
    > http://blog.teamtreehouse.com/install-node-js-npm-windows to install and setup **Node Js**

    > For **Mac OS** users, use this link http://blog.teamtreehouse.com/install-node-js-npm-mac

    > To download the **Node Js** go to https://nodejs.org/en/download/

    > To download and install [**Postgres**](https://www.postgresql.org/) on your machine please follow this link https://www.postgresql.org/download/

    > To download and install [**Postman**](https://www.getpostman.com/) use this resource https://www.getpostman.com/apps

2.  Clone this **repository**

    * To clone this repository.
    * Scroll to the top of the page and look for the `clone or download` green button
    * click on this green button and a white tab pops up with an https url and an option to either `Open in Desktop` or `Download Zip`
    * copy the https link may look like this `https://github.com/iidrees/Events-Manager.git`
    * open your terminal and `cd` to the directory where you would want the repository to be cloned
    * in your terminal run the command `git clone https://github.com/iidrees/Events-Manager.git` in order to clone the repository.

3.  Change directory into the root of the **project directory**.

    > * After cloning the repository, change directory into the repository
    > * In the repository root directory run `npm install` in the terminal to install all Dependecies
    > * Create Postgresql database, and run migrations
    > * In order to create a database after setting up the repository use the following resources:
    >
    >   1.  [How to create a **postgres** database using PG Admin](https://stackoverflow.com/questions/8200917/postgresql-create-a-new-db-through-pgadmin-ui)
    >   2.  [PostgreSQL create a database](http://www.postgresqltutorial.com/postgresql-create-database/)
    >
    > * After creating a database run the following command to run `database migerations`
    >
    > * If you would love to run the command in my package.json run this command in your terminal `npm run seq:create`
    > * Else you can (after installing all the dependencies and devDependencies) run the command `sequelize db:migrate`

4.  Create a `.env` file in the root directory of the application. The purpose of the file is to enable you add information that would normally be Use a different database for your testing and development. Example of the content of a .env file is shown in the .env.example file.

5.  To start the application:

    **In Production**
    To run the application in production, ensure that you have an Heroku account and if not
    below are links on how to signup and host an application on Heroku:

    * https://signup.heroku.com/node
    * https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction
    * https://devcenter.heroku.com/articles/deploying-nodejs

    To start the application, use the command `npm run start:prod` or `npm start`

    **In Development**

    ```
    npm run start:dev
    ```

6.  Use to test all endpoints

## Tests

For Sever side tests - run `npm test` on the terminal while within the **project root directory**.
Server side testing is done through the use of `supertest`, `mocha` & `chai` packages. `supertest` is used to make requests to the api and `mocha` is the testing framework and `chai` is the assertion library. They will both be installed when you run the `npm install` command while setting up the project above and the tests will run when you run `npm test`.

# Features

#### Authentication

* It uses JSON Web Token (JWT) for authentication.
* Token is generated when user sign-up
* Token gets verified each time user interact with the application
* Admin User will be created in the application with administrative priviledges to create centers by a Super-Admin

#### Users

* Users can register/signup
* Users can log in
* Users can add event
* Users can modify event they added
* Users can delete event they added

#### Admin Users

* Admins can edit center they added
* Admins can add new center
* Admins can delete a center they added
* Super-Admins can do all the above and upgrade a `user` to an `admin`

## Technology Stack

**Front-End**

* **[HTML/CSS]()**
* **[Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)**
* **[Twitter Bootstrap](https://getbootstrap.com) / [Font Awesome](https://fontawesome.com/)**
* **[Reactjs](reactjs.org)**
* **[Momentjs](https://momentjs.com/)**
* **[jest](https://facebook.github.io/jest)**

**Server Side**

* **[Node.js](https://nodejs.org)**
* **[Express.js](https://expressjs.com)**
* **[Sequelize](http://docs.sequelizejs.com/)**
* **[Swaggerhub](https://swaggerhub.com)**
* **[webpack](https://webpack.js.org/)**
* **[coveralls](https://coveralls.io/)**
* **[Postgresql](https://www.postgresql.org)**
* **[Postman](https://www.getpostman.com/)**

## Current state

* Still in development

## Limitations

The limitations with this current version of Event Manager includes:

* Some extra features that would enable the application to offer more services to the user are still pending.

## CONTRIBUTING
#### How To Get Started 
> To contribute to this project, please checkout this project's **[CONTRIBUTING.md](https://github.com/iidrees/Events-Manager/blob/develop/CONTRIBUTING.md)** 
---

## Authors

* Idrees Ibraheem

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/iidrees/Events-Manager/blob/develop/LICENSE) file for details.
