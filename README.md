# Document Management Backend

This is a **NestJS** backend application for managing users, documents, and ingestion processes. It includes authentication, role-based authorization, CRUD operations for documents, and ingestion management APIs.

---

## Features

- **Authentication**:
  - User registration
  - Login with JWT token generation
  - Logout functionality
  - Token expiration handling
- **User Management** (Admin-only):
  - Role management (Admin, Editor, Viewer)
  - List all users with pagination
  - Update user roles
  - Delete users
- **Document Management**:
  - CRUD operations for documents
- **Ingestion Management**:
  - Trigger ingestion processes via Python backend
  - Track ingestion statuses

---

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: PostgreSQL (TypeORM for ORM)
- **Authentication**: JWT with role-based authorization
- **Containerization**: Docker and Docker Compose
- **Documentation**: Swagger UI

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) (optional for containerized deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/moin-almin/document-management-backend.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
  - Create a `.env` file in the root directory based on `.env.example` and fill in the required variables:
    ```env
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USER=postgres
    DATABASE_PASSWORD=postgres
    DATABASE_NAME=document_management
    JWT_SECRET=your_jwt_secret
    PYTHON_BACKEND_URL=http://localhost:8000
    ```

4. Start the server:
   ```bash
   npm run start:dev
   ```

---

## Running the Application

### APIs

Swagger documentation is available at:
```
http://localhost:3000/api
```

### Key Endpoints

#### Authentication

- **Register**:
  ```http
  POST /auth/register
  ```
  ```json
  {
    "username": "admin",
    "password": "password"
  }
  ```

- **Login**:
  ```http
  POST /auth/login
  ```
  ```json
  {
    "username": "admin",
    "password": "password"
  }
  ```

- **Logout**:
  ```http
  POST /auth/logout
  ```

#### User Management (Admin-only)

- **List Users**:
  ```http
  GET /users?page=1&limit=10
  ```

- **Update User Role**:
  ```http
  PATCH /users/:id/role
  ```
  ```json
  {
    "role": "Editor"
  }
  ```

- **Delete User**:
  ```http
  DELETE /users/:id
  ```

#### Document Management

- **List Documents**:
  ```http
  GET /documents?page=1&limit=10&title=example
  ```

- **Upload Document**:
  ```http
  POST /documents/upload
  ```
  Use `multipart/form-data` to upload a file.

- **Delete Document**:
  ```http
  DELETE /documents/:id
  ```

#### Ingestion Management

- **Trigger Ingestion**:
  ```http
  POST /ingestion/:documentId/trigger
  ```

- **Get Ingestion Status**:
  ```http
  GET /ingestion/:documentId/status
  ```

---

## Testing

### Run Unit Tests
```bash
npm run test
```

### Run E2E Tests
```bash
npm run test:e2e
```

### Generate Test Coverage Report
```bash
npm run test:cov
```

---

## Deployment

### Local Deployment with Docker Compose

1. Ensure Docker and Docker Compose are installed.
2. Create a `.env` file as shown in the **Installation** section.
3. Use the following `docker-compose.yml` file:
   ```yaml
   version: '3.8'

   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         DATABASE_HOST: db
         DATABASE_PORT: 5432
         DATABASE_USER: postgres
         DATABASE_PASSWORD: postgres
         DATABASE_NAME: document_management
         JWT_SECRET: your_jwt_secret
         PYTHON_BACKEND_URL: http://python_backend:8000
       depends_on:
         - db
         - python_backend
       volumes:
         - ./uploads:/app/uploads

     db:
       image: postgres:14
       environment:
         POSTGRES_USER: postgres
         POSTGRES_PASSWORD: postgres
         POSTGRES_DB: document_management
       ports:
         - "5432:5432"
       volumes:
         - pgdata:/var/lib/postgresql/data

     python_backend:
       build: ./python-backend
       ports:
         - "8000:8000"

   volumes:
     pgdata:
   ```

4. Build and start the services:
   ```bash
   docker-compose up --build
   ```

5. Access the application:
  - **NestJS App**: [http://localhost:3000](http://localhost:3000)
  - **Swagger Docs**: [http://localhost:3000/api](http://localhost:3000/api)
  - **Python Backend**: [http://localhost:8000](http://localhost:8000)

---

### Additional Notes

- **Environment Variables**:
  - Use `.env` for local development.
  - Use environment variables for production secrets in cloud deployments.

- **Health Checks**:
  - Add health check endpoints for Docker or cloud-based monitoring.

---

## Authors

- **Moin Almin** – [LinkedIn](https://www.linkedin.com/in/alms/)

---

Feel free to reach out for any issues or contributions!
