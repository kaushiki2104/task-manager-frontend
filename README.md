# Task Manager App

A full-stack Task Manager application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). Users can register, log in, create tasks, update task status, set priorities, and manage their personal task list securely using JWT authentication.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Logout Functionality
* Password Hashing with bcrypt

### Task Management

* Create Task
* Update Task
* Delete Task
* View All Tasks
* Filter Tasks (All / Active / Done)
* Task Priority (Low / Medium / High)
* Due Date Support

### Dashboard

* Total Tasks Count
* Completed Tasks Count
* Pending Tasks Count

### UI/UX

* Responsive Design
* Loading Skeletons
* Empty State Handling
* Toast Notifications
* Form Validation Messages
* Tailwind CSS Styling

### Security

* JWT Middleware
* Helmet Security Headers
* CORS Configuration
* Rate Limiting
* Zod Validation
* Environment Variables

---

## Tech Stack

### Frontend

* React 18
* React Router DOM
* Axios
* Context API
* Custom Hooks
* Tailwind CSS
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Zod
* Helmet
* CORS
* Express Rate Limit

---

## Project Structure

task-manager/

├── client/

│ ├── src/

│ ├── components/

│ ├── pages/

│ ├── hooks/

│ ├── context/

│ ├── services/

│ └── utils/

│

├── server/

│ ├── src/

│ ├── controllers/

│ ├── models/

│ ├── routes/

│ ├── middleware/

│ ├── validators/

│ └── config/

│

└── README.md

---

## Environment Variables

### Server (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173
```

### Client (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Installation & Setup

### 1. Clone Repository

```bash
git clone <your-repository-url>

cd task-manager
```

### 2. Setup Backend

```bash
cd server

npm install
```

Create a .env file inside the server folder and add the required variables.

Start Backend:

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

### 3. Setup Frontend

```bash
cd client

npm install
```

Create a .env file inside the client folder.

Start Frontend:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
```

#### Login User

```http
POST /api/auth/login
```

#### Logout User

```http
POST /api/auth/logout
```

---

### Tasks

#### Get All Tasks

```http
GET /api/tasks
```

#### Create Task

```http
POST /api/tasks
```

#### Update Task

```http
PATCH /api/tasks/:id
```

#### Delete Task

```http
DELETE /api/tasks/:id
```

---

## Security Implementations

* Password Hashing using bcryptjs
* JWT Authentication
* Protected API Routes
* Zod Request Validation
* Helmet Middleware
* CORS Configuration
* Rate Limiting (100 Requests / 15 Minutes)
* User-specific Task Access
* Environment Variables for Secrets

---

## Screenshots

Add screenshots here before submission.

### Login Page

Insert Screenshot

### Dashboard

Insert Screenshot

### Task Management

Insert Screenshot

---

## Future Improvements

* Refresh Token Authentication
* Search Tasks
* Pagination
* Dark Mode
* Unit Testing with Jest & Supertest
* Deployment using Vercel and Render

---

## Author

Kaushiki Singh

Full Stack Developer Assignment Submission


If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
