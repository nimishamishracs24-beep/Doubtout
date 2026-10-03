# DoubtOut – University Doubt-Solving Platform

DoubtOut is a full-stack web application designed to help university students ask academic questions, connect with professors, receive answers, and contribute solutions to previously asked doubts.

The project provides separate workflows for students and professors, with authentication, role-based access, doubt management, answering, contributions, and an answer archive.

## 🚀 Features

### Student

- Student registration and login
- Role-based authentication
- Ask academic doubts
- Select branch, semester, course, and professor
- View previously asked questions
- Track answered and pending doubts
- View approved contributions
- Browse archived answers

### Professor

- Professor login
- Professor dashboard
- View unanswered student doubts
- Submit answers to student questions
- View previously submitted answers
- Access professor-specific workflows

### General

- JWT-based authentication
- Role-based access control
- REST API integration
- PostgreSQL database
- Responsive web interface
- Student and professor-specific dashboards
- Search and filtering for archived answers

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- TypeScript
- React
- HTML/CSS

### Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication

### Database

- PostgreSQL
- Knex.js

### Development Tools

- Git
- GitHub
- Postman
- npm

---

## 📁 Project Structure

```text
DoubtOut/
│
├── frontend/
│   ├── app/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── student/
│   │   ├── professor/
│   │   └── archive/
│   ├── components/
│   └── lib/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── db.js
│   └── server.js
│
├── frontend-legacy/
│   └── Original frontend implementation
│
├── index.html
├── README.md
└── .gitignore
