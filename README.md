# Peer Prep
## Getting Started
Instructions to run PeerPrep on local environment
<br>

### Using Docker Compose
<br>

Pre-requisites
1. Install Docker and Docker Compose
    * You may want to refer to the installation documemtation on [Docker Docs](https://docs.docker.com/get-docker/)

Steps
1. Change endpoints on frontend to local deployments
   1. Open `./frontend/src/configs.js`
   2. Change deployment URL to `localhost:***`
      * <b>NOTE:</b> Try not to change the ports, if you must, you will need to update the exposed docker ports in `./docker-compose.yml` as well.
2. Go to Project Root run
   1.  `docker compose build --no-cache`
   2.  `docker compose up`
3. Access local staging application at `localhost:8081`
     * <b>NOTE:</b> If you changed the ports for frontend, the deployed port will match that port.

<br>

### Using native environment

#### Pre-requisites
1. Install Node.js and npm
   * You may want to refer to the installation documemtation on [npm Docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

##### Starting individual services

1. Frontend
   1. Navigate to frontend directory
      1. `cd ./frontend`
   2. Install dependencies
      1. `npm install --force`
   3. Change endpoints on frontend to local deployments
      1. Open `./frontend/src/configs.js`
      2. Change deployment URL to `localhost:***`
   4. Build
      1. `npm run build`
   5. Start frontend
      1. `npm start`

<br>

2. User Service
   1. Navigate to User Service directory
      1. `cd ./user-service`
   2. Install dependencies
      1. `npm install`
   3. Configure environment variables using `./user-service/.env` file
      1. Refer to `./docker-compose.yml` for environment variables that should be present in `./user-service/.env`
   4. Start Service
      1. `npm start`
   
<br>

3. Question Service
   1. Navigate to Question Service directory
      1. `cd ./question-service`
   2. Install dependencies
      1. `npm install`
   3. Configure environment variables using `./question-service/.env` file
      1. Refer to `./docker-compose.yml` for environment variables that should be present in `./question-service/.env`
   4. Start Service
      1. `npm start`

<br>

4. Matching Service
   1. Navigate to Matching Service directory
      1. `cd ./matching-service`
   2. Install dependencies
      1. `npm install`
   3. Configure environment variables using `./matching-service/.env` file
      1. Refer to `./docker-compose.yml` for environment variables that should be present in `./matching-service/.env`
   4. Start Service
      1. `npm start`

<br>

5. Collaboration Service
   1. Navigate to Collaboration Service directory
      1. `cd ./collaboration-service`
   2. Install dependencies
      1. `npm install`
   3. Configure environment variables using `./collaboration-service/.env` file
      1. Refer to `./docker-compose.yml` for environment variables that should be present in `./collaboration-service/.env`
   4. Start Service
      1. `npm start`

<br>

6. Chat Service
   1. Navigate to Chat Service directory
      1. `cd ./chat-service`
   2. Install dependencies
      1. `npm install`
   3. Configure environment variables using `./chat-service/.env` file
      1. Refer to `./docker-compose.yml` for environment variables that should be present in `./chat-service/.env`
   4. Start Service
      1. `npm start`

#### Access the application at `http://localhost:8081` or [click here](http://localhost:8081)

<br>

## Configuring Frontend and microservices
By default, the frontend is pre-configured to connect to the various deployed microservices hosted on AWS. Even if you run the frontend locally, it will connect to the deployed microservices and not the local ones. If you wish to change the deployment endpoints to local instances of the various microservice, here are the steps:
1. Locate the frontend configuration file at: `./frontend/src/config.js`
2. For each service that you wish to change the endpoint,
   1. Replace the export const variable with the endpoint of your deployed microservice
   2. e.g. Change 
      * `export const USER_SVC_URI_HOSTNAME ="http://cs3219g49-user-service.eba-gsqyhcuy.ap-southeast-1.elasticbeanstalk.com";` to
      * `export const USER_SVC_URI_HOSTNAME = "http://localhost:8000";`
   3. The default endpoints of the microservices have been pre-defined and commented out for your convienence, you may choose to toggle between them using by commenting them instead of redefining
   4. Please double check the ports of your local endpoints. If you wish to change the ports, please refer to the [Ports Reconfiguration](#ports-reconfiguration) section.

<br>

## Ports reconfiguration
Currently, the application is pre-configured for the individual services to be hosted at:
1. Frontend- `localhost:8081`
2. User Service: `localhost:8000`
3. Question Service: `localhost:3004`
4. Matching Service: `localhost:3001`
5. Collaboration Service: `localhost:3002`
6. Chat Service: `localhost:3003`

These ports can be changed, but do require configuration on the users' end.
1. If you are using docker compose:
   1. Locate the docker compose file at `./docker-compose.yml`
   2. Locate the relavant service that you wish to reconfigure
   3. Look for the line that maps the container's port to your host OS port 
   
            ports:
            - "3004:3004"

    4. Change the first value to the port of your choice

2. If you are using a `.env` file:
   1. Set the `PORT` environment variable to that of your choise
3. If you are not using a `.env` file:
   1. Locate the startup file in the relavant microservice
      * `server.js` or
      * `index.js`
   2. Locate the line in which the application port is set
      * e.g. `const port = process.env.PORT || 3002`
   3. Replace the default port with the port number of your choice 

4. Lastly, you will need to reconfigure the frontend if you wish to connect to them from the frontend. Refer to the [Configuring Frontend](#configuring-frontend-and-microservices) section.

## Running Unit Tests on microservices
Unit tests can be run on the relavant microservices. To do so:
1. Change directory to the microservice
   1. e.g. `cd user-service`
2. Install dependencies
   1. `npm install`
3. Run tests
   1. `npm test`

The results of the tests will be displayed in the console.
