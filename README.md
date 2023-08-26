# Backend Coding Challenge: NestJS Movie API

## Requirements

- Docker
- docker-compose
- Makefile

## How to run the application

Start all the containers

`make start`

Give it some time for the DB to be ready then run

`make initial_db_setup`

To access API logs, use

`make display_api_logs`

## What are the endpoints and what does this API allow me to do?

After you started the application, go to [this url](http://localhost:3000/api)

## What if I want to test with Postman?

When you start the application, a `swagger.json` file is generated. You can then import it easily in Postman as a collection.

Base url should be `http://localhost:3000`
