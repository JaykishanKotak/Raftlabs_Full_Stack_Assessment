# Food Delivery Application - Frontend

A modern React + TypeScript + Vite frontend application for a food delivery platform with user authentication, restaurant browsing, dish ordering, and cart management.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** (npm comes with Node.js)
- **Git** (optional, for version control)

## 🚀 Quick Start

### 1. Install Dependencies

Navigate to the project directory and install all required dependencies:

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

### 2. Run Development Server

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

The application will be available at `http://localhost:5173`

## 📦 Available Scripts

### Development

- **`npm run dev`** - Start the development server with HMR enabled
- **`npm run preview`** - Preview the production build locally

### Building

- **`npm run build`** - Build the application for production (creates optimized bundle in `dist/` folder)

### Code Quality

- **`npm run lint`** - Check for linting errors
- **`npm run lint:fix`** - Automatically fix linting errors
- **`npm run lint:check`** - Check for linting errors without fixing

### Code Formatting

- **`npm run format`** - Format all code files with Prettier
- **`npm run format:check`** - Check code formatting without making changes

### Testing

- **`npm run test`** - Run unit tests with Vitest

## 🐳 Docker Setup

The application can also be run using Docker:

### Build Docker Image

```bash
docker build -t food-delivery-client .
```

### Run Docker Container

```bash
docker run -p 80:80 food-delivery-client
```

The application will be available at `http://localhost`

## 📁 Project Structure

```
src/
├── app/                    # Redux store configuration and hooks
│   ├── hooks.ts           # Custom Redux hooks
│   └── store.ts           # Redux store setup with persist
├── assets/                 # Static assets (images, icons, etc.)
├── components/             # Reusable UI components
│   └── ui/                # UI component library
│       ├── Button.tsx     # Button component
│       ├── Input.tsx      # Input component
│       ├── Modal.tsx      # Modal component
│       ├── Loader.tsx     # Loader component
│       └── Pagination.tsx # Pagination component
├── features/               # Redux slices and related logic
│   ├── auth/              # Authentication state management
│   ├── cart/              # Shopping cart state management
│   └── common/            # Common state management
├── layouts/                # Page layout components
│   ├── CommonLayout.tsx   # Main layout wrapper
│   └── ProfileLayout.tsx  # Profile page layout
├── pages/                  # Page components
│   ├── auth/              # Login and registration pages
│   ├── user/              # User-related pages (dashboard, profile, cart)
│   └── common/            # Common pages (404, etc.)
├── routes/                 # Route definitions and protection
│   ├── router.tsx         # Main router config
│   ├── privateRoutes.tsx  # Protected routes
│   └── publicRoutes.tsx   # Public routes
├── shared/                 # Shared utilities and configurations
│   ├── api/              # API clients and endpoints
│   ├── config/           # App configuration
│   ├── hooks/            # Custom hooks (WebSocket, etc.)
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
└── utils/                  # Application utility functions
```

## 🔧 Key Technologies

- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe development
- **Vite** - Ultra-fast build tool and dev server
- **Redux Toolkit** - Predictable state management
- **React Router v7** - Client-side routing
- **Axios** - Promise-based HTTP client
- **React Hook Form** - Performant form management
- **Yup** - Schema validation
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Persist** - Local storage persistence
- **React Hot Toast** - Toast notifications
- **Vitest** - Fast unit testing framework

## 🌐 Environment Configuration

The API endpoint is configured in [src/shared/api/config.ts](src/shared/api/config.ts). Update the API base URL if needed for different environments:

```typescript
// Example environment setup
const API_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';
```

## 🔐 Authentication Features

- User registration and login
- Protected routes that require authentication
- JWT token management (stored in Redux persist)
- Automatic token refresh on app load
- Role-based access control (user profiles, order history)

## 🛒 Core Features

- **User Authentication** - Secure login and registration
- **Restaurant Browsing** - View available restaurants and dishes
- **Dish Details** - View detailed information about dishes
- **Shopping Cart** - Add/remove items, manage quantities
- **Order Management** - Place orders and view order history
- **User Profile** - View and manage user information
- **City Selection** - Filter restaurants by city

## 🛠️ Development Tips

1. **Hot Module Replacement (HMR)** - Changes are reflected instantly in the browser without losing state
2. **Redux DevTools** - Install [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools-extension) for debugging state changes
3. **ESLint** - Code quality rules are configured in `eslint.config.js`
4. **Prettier** - Code formatting with automatic style enforcement
5. **Network Tab** - Use browser DevTools to inspect API requests and responses

## 📝 Important Notes

- The application uses **Redux with `redux-persist`** for state management and local storage caching
- **Authentication state** is managed in [src/features/auth/authSlice.ts](src/features/auth/authSlice.ts)
- **Cart state** is managed in [src/features/cart/cartSlice.ts](src/features/cart/cartSlice.ts)
- **Routes are protected** based on authentication status using [src/routes/ProtectedRoute.tsx](src/routes/ProtectedRoute.tsx)
- **API calls** are centralized in [src/shared/api/](src/shared/api/) directory
- **Form validation** uses Yup schemas for runtime validation

## 🚨 Common Issues & Solutions

### Port Already in Use

If port 5173 is already in use:

```bash
# Change the port in vite.config.ts or use:
npm run dev -- --port 3000
```

### Dependencies Not Installing

```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### API Connection Errors

1. Ensure backend server is running
2. Check API URL in [src/shared/api/config.ts](src/shared/api/config.ts)
3. Verify CORS is enabled on the backend
4. Check browser console for detailed error messages

## 🤝 Support

If you encounter any issues:

1. Check that all dependencies are installed (`npm install`)
2. Ensure Node.js version is v18 or higher (`node --version`)
3. Verify no port conflicts (default: 5173 for dev)
4. Confirm the API backend is running and accessible
5. Clear browser cache and Redux persist (`localStorage`)
6. Check browser console for error messages
