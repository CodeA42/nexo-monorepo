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

# Notes on known issues
1. The project schemas are not finished and might occasionally break, had that been a full fledged project the schemas need to be finished.
2. The debugger for the app broke so no breakpoints. No idea when that happenned. The test debugger works which is ever funnier.
3. The db entities are having type issues as well.
4. The logging is too much, each separate transaction is saved and logged with the relations it has.
5. The filters are only checking for an exact match, no other options are available. Example: Greater than for numbers, partial string matchers and so on.
6. The project is using mongodb due to my unkowing as to how often the emitted data from the ethereum network changes and implementing migrations in a good way might have slowed me down so no postgres. Which would have made the whole project run much better. And with less weird cases like `withdrawal.service.ts:33` (also this is not searching for filters it, is just getting them all).
7. Each time we get a new block from the eth network we fetch all the filters from the database. Instead Redis can be added or a similart service to load the filters into it when the app starts to make the app a bit snappier.
8. The tests are lackluster, there are no mocks of the event system so that arbitrary events can be passesd to test the overall system.
9. The app itself is not in a docker container, so good luck on windows without wsl2
