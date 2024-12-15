## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository with extended functionality.

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

- **Node.js version:** 20.14.0
- **NestJS CLI version:** 10.4.9

## Installed Dependencies

- `@nestjs/typeorm`, `typeorm`, `pg`: For database integration.
- `@nestjs/jwt`, `passport`, `passport-jwt`: For authentication.
- `@nestjs/config`, `multer`: For configuration and file uploads.

## Environment Configuration

- Added `.env` support using dotenv.
- Sample environment variables:
    ```env
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USER=your_db_user
    DATABASE_PASSWORD=your_db_password
    DATABASE_NAME=document_management
    JWT_SECRET=your_jwt_secret
    PYTHON_BACKEND_URL=http://localhost:8000
    ```

## Project Setup

```bash
# Clone the repository
$ git clone <repository-url>
$ cd <repository-directory>

# Install dependencies
$ npm install
```

## Compile and Run the Project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testing the Project

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Run the Python Backend (Optional for Testing)

```bash
# Navigate to Python backend directory
$ cd python-backend

# Activate virtual environment
$ source python-backend-env/bin/activate

# Start the Python server
$ python app.py
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running locally, and the credentials in the `.env` file are correct.
- Manually create the database `document_management` if it doesn't exist.

### Python Virtual Environment Issues
- If the virtual environment is not working, ensure it's activated before running the Python server.
- Reinstall dependencies using:
  ```bash
  pip install flask --force-reinstall
  ```

## Stay in Touch

- **Author**: [Moin Almin](https://linkedin.com/alms)
