# Instructions on setting up local staging environment using docker compose

## Pre-requisites
1. Install Docker and Docker Compose
   * You may want to refer on installation documemtation on [Docker Docs](https://docs.docker.com/get-docker/)

## Steps

1. Change endpoints on frontend to local deployments
   1. Open `./frontend/src/configs.js`
   2. Change deployment URL to `localhost:***`
      * <b>NOTE:</b> Try not to change the ports, if you must, you will need to update the exposed docker ports in `./docker-compose.yml` as well.
2. Go to Project Root run
   1.  `docker compose build --no-cache`
   2.  `docker compose up`
3. Access local staging application at `localhost:8081`
     * <b>NOTE:</b> If you changed the ports for frontend, the deployed port will match that port.
