## Description

[Nest](https://github.com/nestjs/nest) API to verify/create estonian personal code for testing purpose

## Installation

Copy `.env.sample` and rename to `.env` update the values if needed.

**Optional** You can use docker-compose.yml to run dockerized version of postgres and adminer for database. using `docker compose up` command in root folder.

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

You can access API at `http://localhost:3000`

## Route

#### Create Personal Code
Generate personal code when Gender and DoB provided.

**URL** `/personal-code`

**Method** `POST`

**Body Params** 

```Json
{ "gender": "MALE/FEMALE", "dob": "dd.mm.yyyy" }
```

#### Validate Personal code
Validate provided personal code

**URL** `/personal-code/:code`

**Method** `GET`

**Query Param**

personal code 11 digit number