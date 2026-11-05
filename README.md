# Joineazy Assignment & Review Dashboard

A responsive Assignment & Review Dashboard built with React.js and Tailwind CSS.

## Features

### Login
- Mock login with seeded users
- Student and Admin/Professor roles
- No real authentication required

### Student Dashboard
- View assigned assignments
- View assignment description and due date
- Open assignment Drive link
- Submit assignments with confirmation
- Track overall submission progress
- Search assignments
- Filter assignments by status
- Overdue assignment highlighting
- Student-specific assignment data

### Admin Dashboard
- Create assignments
- Edit assignments
- Delete assignments
- Assign assignments to selected students or all students
- View student submission status
- View class completion progress
- Admins can manage assignments they created

### Data Persistence
- Uses browser `localStorage`
- Assignment changes and submission status remain after page refresh

## Tech Stack

- React.js
- JavaScript
- Tailwind CSS
- Vite
- Browser localStorage

## Project Structure

```text
src/
├── components/
├── data/
│   └── mockData.js
├── pages/
│   ├── Login.jsx
│   ├── StudentDashboard.jsx
│   └── AdminDashboard.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx