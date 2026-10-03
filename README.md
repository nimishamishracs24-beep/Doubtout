# 🎓 DoubtOut – University Doubt-Solving Platform

DoubtOut is a **full-stack academic doubt-solving platform** designed to make communication between students and professors more organized and accessible.

The platform allows students to post academic doubts and enables professors to respond to them, creating a centralized environment for asking, managing, and resolving academic questions.

## 🎯 Problem Statement

Students often face difficulties getting their academic doubts resolved outside classroom hours. DoubtOut provides a centralized platform where students can post questions and professors can respond, making the doubt-resolution process more structured and accessible.

## ✨ Key Features

### 👨‍🎓 Student Functionality

* Secure student registration and login
* Post academic doubts
* Manage submitted questions
* View responses from professors

### 👨‍🏫 Professor Functionality

* Secure professor authentication
* View student questions
* Respond to academic doubts
* Manage responses

### 🔐 Authentication & Authorization

* Secure authentication
* Role-based access control
* Protected routes
* Backend validation

### 🗄️ Data Management

* PostgreSQL database
* CRUD operations for application data
* Structured relational data management
* Backend validation and error handling

### 🔌 REST APIs

* RESTful backend architecture
* APIs for authentication
* Question and response management
* Frontend-backend integration

## 🏗️ System Architecture

```text
┌──────────────────────────┐
│       Web Frontend       │
│    Next.js + TypeScript  │
└────────────┬─────────────┘
             │ REST APIs
             ▼
┌──────────────────────────┐
│    Node.js + Express     │
│       Backend API        │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│       PostgreSQL         │
│         Database         │
└──────────────────────────┘
```

## 🛠️ Tech Stack

**Frontend**

* Next.js
* React
* TypeScript
* HTML / CSS

**Backend**

* Node.js
* Express.js
* REST APIs

**Database**

* PostgreSQL

**Development**

* Git
* GitHub
* Postman

## 📂 Project Structure

```text
DoubtOut/
│
├── frontend/                 # Next.js + TypeScript app
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── ...
│   ├── pages/
│   ├── components/
│   ├── css/
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
├── README.md
└── ...
```

> Update the structure above if your current repository uses different folder names.

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* PostgreSQL
* Git

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd DoubtOut
```

### 2. Install dependencies

```bash
npm install
```

If the frontend and backend have separate `package.json` files, install dependencies inside each directory:

```bash
cd backend
npm install
```

and:

```bash
cd frontend
npm install
```

### 3. Configure the database

Create a PostgreSQL database for the application and configure the database connection through environment variables.

Example:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
```

Never commit `.env` files or expose database credentials.

### 4. Start the application

Start the backend:

```bash
npm start
```

For development:

```bash
npm run dev
```

Then start the frontend according to the repository's configured scripts.

## 🔄 Application Flow

```text
Student
   │
   ▼
Register / Login
   │
   ▼
Post Academic Doubt
   │
   ▼
Backend API
   │
   ▼
PostgreSQL
   │
   ▼
Professor Views Doubt
   │
   ▼
Professor Responds
   │
   ▼
Student Views Response
```

## 🔒 Security & Reliability

* Authentication and authorization
* Role-based access control
* Backend input validation
* Protected routes
* CRUD operations
* Error handling
* Secure environment-variable configuration

## 🌱 Future Improvements

* Real-time notifications
* Search and filtering of questions
* Question categorization by subject
* Upvoting useful questions
* File and image attachments
* Professor availability indicators
* AI-assisted doubt categorization and routing

## 👩‍💻 My Contribution

I worked on the **full-stack development** of DoubtOut, with a focus on:

* Developing the Node.js and Express.js backend
* Designing and implementing RESTful APIs
* Integrating PostgreSQL for persistent data storage
* Implementing authentication and role-based access control
* Developing CRUD operations for questions and responses
* Implementing backend validation and error handling
* Connecting the frontend with backend APIs
* Contributing to the responsive user interface

## 📌 Project Status

**Academic / Portfolio Project**

DoubtOut was developed as a full-stack web application to demonstrate practical skills in backend development, REST API design, relational databases, authentication, authorization, and frontend-backend integration.


## 🔄 Frontend Migration (Next.js + TypeScript)

The original static HTML frontend has been preserved in `frontend-legacy/`.
The active frontend is now `frontend/`, built with **Next.js + React + TypeScript** and connected to the existing Express/PostgreSQL API.

### Local development

Terminal 1 — backend:
```bash
cd backend
npm install
# create backend/.env with DATABASE_URL=...
npm run dev
```

Terminal 2 — Next.js frontend:
```bash
cd frontend
npm install
copy .env.example .env.local
npm run dev
```

The frontend expects the API at `http://localhost:5000/api` by default.

### Current migrated flows

- Landing page
- Student/professor login and signup
- Student dashboard
- Ask a doubt
- Student questions and answers
- Student contributions
- Professor dashboard and answering doubts
- Answer archive with search/filter fields

The legacy HTML pages remain available for reference while the remaining practice/review flows are migrated.
