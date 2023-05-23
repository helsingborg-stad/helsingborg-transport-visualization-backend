# Transport Visualization Backend

Environment:
`.env` file is used by production and dev environment. `.env.test` is used for running tests.

To run the project locally:

```shell
cp .env.example .env # and fill in the correct values
npm run dev
```

or using docker:

```shell
docker-compose up
```

Note: when running app using docker, make sure you run all the migrations from **_Inside the container_**:
Example:

```shell
docker exec -it <container_id> /bin/bash # connect to container
npm run migrate:run && npm run seed
```

Note: To generate a value for TOKEN env var:

```shell
openssl rand -base64 128
```

Migrations:

```shell
# create new migration in the migrations folder
npx typeorm migration:create <name_of_migration>

# migrate pending migrations - default connection
npm run migrate:run
# test connection
npm run test:migrate:run

# revert latest migration - default connection
npm run migrate:revert
# test connection
npm run test:migrate:revert

# seed database - default connection
npm run seed
# test connection
npm run test:seed
```

Run tests:

```shell
npm test
```

Swagger documentation is available at `/api-docs`

Good to know:
If you run in to the following error on setup with docker:

```shell
/path/to/local/module/node_modules/bcrypt/lib/binding/napi-v3/bcrypt_lib.node: invalid ELF header
```

Execute the following command in the docker container for backend:

```shell
npm uninstall bcrypt && npm install bcrypt
```
