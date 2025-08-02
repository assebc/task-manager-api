# 📝 Task Manager API

A simple RESTful API for managing tasks, built with **Node.js**, **Express**, and **MongoDB**. It supports user authentication and task CRUD operations with JWT-based security.

---

## 📦 Tech Stack

- **Node.js** (runtime)
- **Express** (API framework)
- **MongoDB + Mongoose** (database + ODM)
- **JWT (jsonwebtoken)** for secure auth
- **bcryptjs** for password hashing
- **dotenv** for environment configuration

---

## 📚 Dependencies Explained

| Dependency       | Purpose |
|------------------|---------|
| **`express`**    | Web framework to handle routes, middleware, and HTTP requests/responses. |
| **`mongoose`**   | ODM (Object Document Mapper) to interact with MongoDB using schemas and models. |
| **`bcryptjs`**   | Used to hash passwords before storing them in the database. Also used to compare user input during login. |
| **`jsonwebtoken`** | Generates and verifies JWT tokens to manage user sessions securely. |
| **`dotenv`**     | Loads environment variables from a `.env` file into `process.env` so secrets (e.g., database URIs, JWT secret) don't get hardcoded. |

---

## 🚀 Getting Started

### 1. **Clone the repository**
```bash
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Run project**
```bash
npm start
```
