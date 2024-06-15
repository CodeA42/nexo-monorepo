# Project Info

The project is a [nx](https://nx.dev/) monorepo. The API is build with [Nestjs](https://nestjs.com/). Validation is done with [zod](https://zod.dev/). Databse [mongodb](https://www.mongodb.com/)

# Getting Started

# Create `.env` file

Create a file named `.env` and fill in as a minimum the `INFURA_API_KEY`, `INFURA_WSS_NETWORK` and `MONGO_URL` variables
The rest of the environment variables are located in `nexo-transaction-watcher-configuration.ts` however they are not mandatory.

## Note on db setup
The database is using a hardcoded name and ports as well as the mongo-express app. For dev purposes these can be changed in the `docker-compose.yml` file. If needed configuration can be updated to support dynamic configuration with `.env` file. 

# Install dependencies and run the application

1.  `docker compose up -d` To run the database which also provides a mongo-express app to read the database at `localhost:8081` can also be ran with the `make db` command provided in the `Makefile` file
2.  `npm i`
3.  `npm start`

# Run the Integration tests

## Requirement for the Integration tests is a running database
`npm test`

Important note, the database is cleared after each test run. Update the `docker-compose.yml` and `.env` files to use a different database than the local one if preserving dev data is needed(testing as little in dev and as much as possible in tests is recommended).

Integration tests do not require the application to be running. During testing the application is scaffolded for each tests and torn down after the test completes.

# Additional useful commands

1. Type checking per projeect can be done with `npx nx run [project-name]:type-check` example `npx nx run transaction-watcher:type-check`
2. The project formatter can be ran with `npx nx run m2m-nasa-bffe:format`
3. For convenience there is a makefile with useful commands for instance `make push` which will run all relevan formatters and linters and is most useful right before pushing code.
