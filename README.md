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
```

## Live Demo

Live application: https://joineazy-assignment-dashboard-umber.vercel.app/

GitHub repository: https://github.com/yeolehimakshi-boop/joineazy-assignment-dashboard

## Component Architecture

### App
Controls the main application state, current logged-in user, assignments, login/logout, student submissions, and localStorage persistence.

### Login
Provides the mock user selection and role-based login.

### StudentDashboard
Displays assignments assigned to the logged-in student and handles submission confirmation, progress tracking, search, and filtering.

### AdminDashboard
Provides assignment management and displays student submission progress.

## Design Decisions

- React state is used for managing users and assignments.
- `localStorage` is used instead of a backend because this assignment requires a frontend-only implementation.
- Reusable dashboard sections are separated into page components for clearer organization.
- Tailwind CSS utility classes are used for responsive styling.
- The interface uses simple cards, status badges, progress indicators, and confirmation dialogs to keep the dashboard easy to understand.

## Setup

Clone the repository:

```bash
git clone https://github.com/yeolehimakshi-boop/joineazy-assignment-dashboard.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the local development URL shown by Vite.

## Demo Users

The project uses seeded mock users for demonstration.

- Admin users can access the Admin Dashboard.
- Student users can access the Student Dashboard.

No real authentication or backend is used.

## Future Improvements

Possible future improvements include:

- Real authentication
- Backend/API integration
- Database storage
- File upload support
- Notifications
- More advanced analytics