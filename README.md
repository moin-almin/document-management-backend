## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Postman API Public Link
- [Postman](https://www.postman.com/gold-station-681337/workspace/document-management/request/13012694-cc86ee05-d574-43f6-af2b-d0bfdf00693d?action=share&creator=13012694&ctx=documentation)

## Python Backend Simulation
1. Navigate to the `python-backend` directory.
2. Activate the virtual environment: `source python-backend-env/bin/activate`
3. Start the Flask server: `python app.py`
4. Flask app runs on `http://localhost:8000`.

```bash
# start venv
$ python-backend-env\Scripts\Activate

# change directory
$ cd .\python-backend\

# start server on 8000
$ python app.py
```

## Project Initialization

- Node.js version: 20.14.0
- NestJS CLI version: 10.4.9

## Installed Dependencies

- @nestjs/typeorm, typeorm, pg: For database integration.
- @nestjs/jwt, passport, passport-jwt: For authentication.
- @nestjs/config, multer: For configuration and file uploads.

## Environment Configuration

- Added `.env` support using dotenv.
- Sample environment variables:
    - DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME
    - JWT_SECRET

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Moin Almin](https://linkedin.com/alms)