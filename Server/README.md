# Food Delivery Application - Backend

A scalable Food Delivery Application API server built with Node.js, TypeScript, Express, and MongoDB featuring authentication with JWT.

## 📁 Project Structure

```
Server/
├── src/
│   ├── __tests__/          # Test files
│   │   ├── auth.test.ts    # Authentication API tests
│   │   └── user.test.ts    # User model tests
│   ├── config/             # Configuration files
│   │   ├── index.ts        # Main config
│   │   └── database.ts     # MongoDB connection
│   ├── controllers/        # Request handlers
│   │   └── authController.ts
│   ├── middleware/         # Custom middleware
│   │   ├── auth.ts         # JWT authentication
│   │   ├── errorHandler.ts # Error handling
│   │   └── validation.ts   # Input validation
│   ├── models/             # Database models
│   │   ├── User.ts
│   │   └── user.interface.ts
│   ├── routes/             # API routes
│   │   ├── authRoutes.ts
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   └── jwt.ts
│   ├── app.ts              # Express app setup
│   └── index.ts            # Server entry point
├── .env.example            # Environment variables template
├── .gitignore
├── jest.config.js          # Jest configuration
├── nodemon.json            # Nodemon configuration
├── package.json
├── tsconfig.json           # TypeScript configuration
└── README.md
```

## 🚀 Features

- ✅ **TypeScript** - Type-safe code
- ✅ **Express.js** - Fast, unopinionated web framework
- ✅ **MongoDB** - NoSQL database with Mongoose ODM
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Password Hashing** - bcryptjs for secure password storage
- ✅ **Input Validation** - express-validator for request validation
- ✅ **Error Handling** - Centralized error handling middleware
- ✅ **Security** - Helmet, CORS protection
- ✅ **Testing** - Jest with Supertest for API testing
- ✅ **Code Quality** - TypeScript strict mode
- ✅ **Development** - Nodemon for auto-reload

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   cd Server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and update the values:

   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/your_database_name
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Make sure MongoDB is running**
   - Local: Start MongoDB service
   - Atlas: Use your connection string in `.env`

## 🎯 Available Scripts

### Development

```bash
npm run dev
```

Starts the development server with hot-reload using nodemon.

### Build

```bash
npm run build
```

Compiles TypeScript to JavaScript in the `dist/` folder.

### Production

```bash
npm start
```

Runs the compiled JavaScript from `dist/` folder.

### Testing

```bash
npm test
```

Runs all tests with coverage report.

```bash
npm run test:watch
```

Runs tests in watch mode for development.

### Type Checking

```bash
npm run lint
```

Checks TypeScript types without emitting files.

## 📡 API Endpoints

### Authentication

#### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Health Check

```http
GET /api/health
```

**Response:**

```json
{
  "status": "success",
  "message": "Server is running"
}
```

## 🔐 Authentication

Protected routes require a JWT token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

Example with curl:

```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
     http://localhost:5000/api/protected-route
```

## 🧪 Testing

The project includes comprehensive tests for:

- User model (validation, password hashing, etc.)
- Authentication APIs (register, login)

Run tests:

```bash
npm test
```

Test coverage:

```bash
npm test -- --coverage
```

## 📝 Environment Variables

| Variable         | Description                          | Default                                        |
| ---------------- | ------------------------------------ | ---------------------------------------------- |
| `PORT`           | Server port                          | `5000`                                         |
| `NODE_ENV`       | Environment (development/production) | `development`                                  |
| `MONGODB_URI`    | MongoDB connection string            | `mongodb://localhost:27017/your_database_name` |
| `JWT_SECRET`     | Secret key for JWT                   | -                                              |
| `JWT_EXPIRES_IN` | JWT expiration time                  | `7d`                                           |
| `CORS_ORIGIN`    | Allowed CORS origin                  | `http://localhost:3000`                        |

## 🏗️ Architecture

### Scalable Structure

- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic (can be added as needed)
- **Models**: Database schemas and methods
- **Middleware**: Request processing (auth, validation, errors)
- **Routes**: API endpoint definitions
- **Utils**: Helper functions
- **Config**: Configuration management

### Error Handling

Centralized error handling with custom `AppError` class:

- Operational errors (4xx)
- Server errors (5xx)
- Mongoose validation errors
- JWT errors

### Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Helmet for HTTP headers security
- CORS protection
- Input validation and sanitization

## 🔧 Customization

### Adding New Routes

1. Create controller in `src/controllers/`
2. Create route file in `src/routes/`
3. Import and mount in `src/routes/index.ts`

### Adding New Models

1. Create interface in `src/models/*.interface.ts`
2. Create model in `src/models/*.ts`

### Adding Middleware

1. Create middleware in `src/middleware/`
2. Apply in routes or `app.ts`

## 📚 Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Testing**: Jest + Supertest
- **Security**: Helmet, CORS
- **Development**: Nodemon, ts-node

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

ISC

## 👨‍💻 Author

Your Name

---

**Happy Coding! 🚀**
