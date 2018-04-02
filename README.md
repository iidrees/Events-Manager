# Events-Manager


[![Build Status](https://travis-ci.org/iidrees/Events-Manager.svg?branch=develop)](https://travis-ci.org/iidrees/Events-Manager)
[![Coverage Status](https://coveralls.io/repos/github/iidrees/Events-Manager/badge.svg?branch=develop)](https://coveralls.io/github/iidrees/Events-Manager?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/507b075d1aa0f1e22e24/maintainability)](https://codeclimate.com/github/iidrees/Events-Manager/maintainability)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Introduction

This is a project divided into three parts:

1. The Templates:
    
    * This part holds the UI or template and mock-up design for the client-side.
 
2. The Server:

    * This part holds the API that will be consumed by the user 

3. The Client:

    * This part holds the front-end functionalities that enables users to have seamless experience using the web application


## Getting Started

This is a javascript application built with [**Express**](https://expressjs.com/) framework on the nodejs platform. Authentication of users is done via [**JSON Web Tokens**](https://jwt.io/).

This is a project in three parts, and the first part is to design a UI Template to be hosted using Github Pages.
To view the UI template for the Events-Manager web application on Github Pages, you should click on this link [Events-Manager](https://iidrees.github.io/Events-Manager/template/landing.html).

To get more information on how to use the API, a good place to start would be here: [Events-Manager Doc](https://swaggerhub.com/apis/events-manager/Events-manager/1.0.0) on swaggerhub.


### Prerequisites
To view the UI Template, please use a web browser, preferably, Google Chrome and ensure you have a very good internet connection for a good web experience.
rrent-state)


## Installation

1. Install [**Node JS**](https://nodejs.org/en/).
2. Install [**Postgres**](https://www.postgresql.org/) .
3. Clone the [**repository here**](https://github.com/iidrees/Events-Manager)
4. [**cd**] into the root of the **project directory**.
5. Run `npm install` on the terminal to install all Dependecies
6. Install sequelize-cli, Create Postgresql database, and run migrations:
```
npm install -g seqeulize-cli
npm run seq:create 
```
7. Create a `.env` file in the root directory of the application. Use a different database for your testing and development. Example of the content of a .env file is shown in the .env.example

8. Start the application:
**_Different Build Environment_**

**Production**
```
npm start
```
**Development**
```
npm run start:dev 

```

## Limitations
The limitations with this current version of Event Manager includes:
* Some extra features that would enable to offer more services to the user are still pending.


## Tests

Sever side tests - run `npm test` on the terminal while within the **project root directory**.


### Starting
In the project root, run `npm run start:dev` for development.
For production run `npm run start:prod` or `npm start`.


### Authentication

- It uses JSON Web Token (JWT) for authentication.
- Token is generated when user sign-up
- Token gets verified each time user interact with the application
- Admin User will be created in the application with administrative priviledges to create centers by a Super-Admin

### Users

- Users can register/signup
- Users can log in
- Users can add event
- Users can modify event they added
- Users can delete event they added

### Admin Users
- Admins can edit center they added
- Admins can add new center
- Admins can delete a center they added
- Super-Admins can do all the above and upgrade a `user` to an `admin`

## Usage
- Run database migration with `npm run seq:create`
- Start app in development with `npm run start:dev`
- Install **Postman** and use to test all endpoints


## The API Endpoints
**user signup and login**
* `POST` https://events-manager-cp.herokuapp.com/users
* `POST` https://events-manager-cp.herokuapp.com/api/v1/login

**Centers**
* `POST` https://events-manager-cp.herokuapp.com/api/v1/centers
* `GET`  https://events-manager-cp.herokuapp.com/api/v1/centers
* `GET`  https://events-manager-cp.herokuapp.com/api/v1/centers/:centerId
* `PUT`  https://events-manager-cp.herokuapp.com/api/v1/centers/:centerId
* `DEL`  https://events-manager-cp.herokuapp.com/api/v1/centers/:centerId

**Events**
* `POST` https://events-manager-cp.herokuapp.com/api/v1/events
* `GET`  https://events-manager-cp.herokuapp.com/api/v1/events
* `GET`  https://events-manager-cp.herokuapp.com/api/v1/events/;eventId
* `PUT`  https://events-manager-cp.herokuapp.com/api/v1/events/:eventId
* `DEL`  https://events-manager-cp.herokuapp.com/api/v1/events/:eventId



## Testing

Server side testing is done through the use of `supertest`, `mocha` and `chai` packages. `supertest` is used to make requests to the api and `mocha` is the testing framework and `chai` is the assertion library. They will both be installed when you run `npm install` and the tests will run when you run `npm test`.

### Technology Stack
**UI, React & Templates**
* HTML/CSS
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Twitter Bootstrap](getbootstrap.com) / [Font Awesome](fontawesome.io/icons/)
* [Reactjs](reactjs.org)
* [Momentjs](https://momentjs.com/)
* [jest](https://facebook.github.io/jest)




**Server Side**
1. [Node.js](https://nodejs.org)
2. [Express.js](https://expressjs.com)
3. Sequelize
4. [Swaggerhub](https://swaggerhub.com)
5. [webpack](https://webpack.js.org/)
6. [coveraals](https://coveralls.io/)
7. [Postgresql](https://www.postgresql.org)





## Current state
* Still in development


## Authors

* Idrees Ibraheem

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/iidrees/Events-Manager/blob/develop/LICENSE) file for details.
