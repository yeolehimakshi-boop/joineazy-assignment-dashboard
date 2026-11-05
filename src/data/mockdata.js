export const users = [
  {
    id: 1,
    name: "Admin One",
    email: "admin1@joineazy.com",
    role: "admin",
  },
  {
    id: 2,
    name: "Admin Two",
    email: "admin2@joineazy.com",
    role: "admin",
  },
  {
    id: 3,
    name: "Himakshi",
    email: "himakshi@student.com",
    role: "student",
  },
  {
    id: 4,
    name: "Rahul",
    email: "rahul@student.com",
    role: "student",
  },
  {
    id: 5,
    name: "Priya",
    email: "priya@student.com",
    role: "student",
  },
  {
    id: 6,
    name: "Amit",
    email: "amit@student.com",
    role: "student",
  },
  {
    id: 7,
    name: "Sneha",
    email: "sneha@student.com",
    role: "student",
  },
];

export const initialAssignments = [
  {
    id: 1,
    title: "React Fundamentals",
    description:
      "Build a small React application using components and props.",
    dueDate: "2026-11-08",
    driveLink: "https://drive.google.com/",
    createdBy: 1,
    assignedTo: [3, 4, 5, 6, 7],
    submissions: {},
  },
  {
    id: 2,
    title: "JavaScript Practice",
    description:
      "Complete the assigned JavaScript problems covering arrays and functions.",
    dueDate: "2026-11-10",
    driveLink: "https://drive.google.com/",
    createdBy: 1,
    assignedTo: [3, 4, 5],
    submissions: {},
  },
];