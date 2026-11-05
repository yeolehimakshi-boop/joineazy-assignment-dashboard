import { useEffect, useState } from "react";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { initialAssignments, users } from "./data/mockdata";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // Load assignments from localStorage when the app starts
  const [assignments, setAssignments] = useState(() => {
    const savedAssignments = localStorage.getItem("assignments");

    return savedAssignments
      ? JSON.parse(savedAssignments)
      : initialAssignments;
  });

  // Save assignments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      "assignments",
      JSON.stringify(assignments)
    );
  }, [assignments]);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Handle student assignment submission
  const handleSubmitAssignment = (assignmentId, studentId) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) => {
        if (assignment.id !== assignmentId) {
          return assignment;
        }

        return {
          ...assignment,
          submissions: {
            ...assignment.submissions,
            [studentId]: true,
          },
        };
      })
    );
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  // Student dashboard
  if (currentUser.role === "student") {
    return (
      <StudentDashboard
        user={currentUser}
        assignments={assignments}
        onSubmitAssignment={handleSubmitAssignment}
        onLogout={handleLogout}
      />
    );
  }

  // Admin dashboard
  if (currentUser.role === "admin") {
    return (
      <AdminDashboard
        user={currentUser}
        assignments={assignments}
        setAssignments={setAssignments}
        users={users}
        onLogout={handleLogout}
      />
    );
  }

  return null;
}

export default App;