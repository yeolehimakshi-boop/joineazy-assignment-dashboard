import { useState } from "react";

function AdminDashboard({ user, assignments, setAssignments, users, onLogout }) {
  const students = users.filter((user) => user.role === "student");

  const [showForm, setShowForm] = useState(false);

  const [editingAssignment, setEditingAssignment] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    driveLink: "",
    assignedTo: [],
  });

  const myAssignments = assignments.filter(
    (assignment) => assignment.createdBy === user.id
  );

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      driveLink: "",
      assignedTo: [],
    });

    setEditingAssignment(null);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStudentSelection = (studentId) => {
    setFormData((prev) => {
      const alreadySelected = prev.assignedTo.includes(studentId);

      return {
        ...prev,
        assignedTo: alreadySelected
          ? prev.assignedTo.filter((id) => id !== studentId)
          : [...prev.assignedTo, studentId],
      };
    });
  };

  const handleSelectAll = () => {
    setFormData((prev) => ({
      ...prev,
      assignedTo:
        prev.assignedTo.length === students.length
          ? []
          : students.map((student) => student.id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.dueDate ||
      !formData.driveLink ||
      formData.assignedTo.length === 0
    ) {
      alert("Please fill all fields and select at least one student.");
      return;
    }

    if (editingAssignment) {
      setAssignments((prev) =>
        prev.map((assignment) =>
          assignment.id === editingAssignment.id
            ? {
                ...assignment,
                title: formData.title,
                description: formData.description,
                dueDate: formData.dueDate,
                driveLink: formData.driveLink,
                assignedTo: formData.assignedTo,
              }
            : assignment
        )
      );
    } else {
      const newAssignment = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        driveLink: formData.driveLink,
        createdBy: user.id,
        assignedTo: formData.assignedTo,
        submissions: {},
      };

      setAssignments((prev) => [...prev, newAssignment]);
    }

    resetForm();
  };

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);

    setFormData({
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate,
      driveLink: assignment.driveLink,
      assignedTo: assignment.assignedTo,
    });

    setShowForm(true);
  };

  const handleDelete = (assignmentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this assignment?"
    );

    if (!confirmed) return;

    setAssignments((prev) =>
      prev.filter((assignment) => assignment.id !== assignmentId)
    );
  };

  const getProgress = (assignment) => {
    const totalStudents = assignment.assignedTo.length;

    if (totalStudents === 0) return 0;

    const submittedStudents = assignment.assignedTo.filter(
      (studentId) => assignment.submissions[studentId]
    ).length;

    return Math.round((submittedStudents / totalStudents) * 100);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              Admin Dashboard
            </h1>

            <p className="text-sm text-slate-500">
              Welcome, {user.name}
            </p>
          </div>

          <button
            onClick={onLogout}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-8">
        {/* Top section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              My Assignments
            </h2>

            <p className="text-slate-500 mt-1">
              Create and manage assignments for your students.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium"
          >
            + Create Assignment
          </button>
        </div>

        {/* Assignment form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                {editingAssignment
                  ? "Edit Assignment"
                  : "Create Assignment"}
              </h3>

              <button
                onClick={resetForm}
                className="text-slate-500 hover:text-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Assignment Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter assignment title"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter assignment description"
                  rows="3"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Due Date
                  </label>

                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Drive Submission Link
                  </label>

                  <input
                    type="url"
                    name="driveLink"
                    value={formData.driveLink}
                    onChange={handleInputChange}
                    placeholder="https://drive.google.com/..."
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Students */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-slate-700">
                    Assign Students
                  </label>

                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {formData.assignedTo.length === students.length
                      ? "Unselect All"
                      : "Select All"}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {students.map((student) => (
                    <label
                      key={student.id}
                      className="flex items-center gap-3 border border-slate-200 rounded-lg p-3 cursor-pointer hover:bg-slate-50"
                    >
                      <input
                        type="checkbox"
                        checked={formData.assignedTo.includes(student.id)}
                        onChange={() =>
                          handleStudentSelection(student.id)
                        }
                        className="w-4 h-4"
                      />

                      <div>
                        <p className="font-medium text-slate-700">
                          {student.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {student.email}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium"
                >
                  {editingAssignment
                    ? "Update Assignment"
                    : "Create Assignment"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-slate-300 px-5 py-3 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Assignment list */}
        {myAssignments.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center">
            <h3 className="font-semibold text-slate-700">
              No assignments yet
            </h3>

            <p className="text-slate-500 mt-2">
              Create your first assignment using the button above.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {myAssignments.map((assignment) => {
              const progress = getProgress(assignment);

              return (
                <div
                  key={assignment.id}
                  className="bg-white rounded-2xl shadow-sm p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">
                        {assignment.title}
                      </h3>

                      <p className="text-slate-600 mt-2">
                        {assignment.description}
                      </p>

                      <p className="text-sm text-slate-500 mt-3">
                        Due: {assignment.dueDate}
                      </p>

                      <a
                        href={assignment.driveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-3 text-blue-600 hover:underline text-sm"
                      >
                        Open Drive Link →
                      </a>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(assignment)}
                        className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium hover:bg-slate-50"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(assignment.id)}
                        className="px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-slate-700">
                        Class Completion
                      </span>

                      <span className="text-slate-500">
                        {progress}%
                      </span>
                    </div>

                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Student status */}
                  <div className="mt-6">
                    <h4 className="font-semibold text-slate-700 mb-3">
                      Student Status
                    </h4>

                    <div className="grid gap-2">
                      {assignment.assignedTo.map((studentId) => {
                        const student = students.find(
                          (student) => student.id === studentId
                        );

                        const submitted =
                          assignment.submissions[studentId];

                        return (
                          <div
                            key={studentId}
                            className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3"
                          >
                            <div>
                              <p className="font-medium text-slate-700">
                                {student?.name}
                              </p>

                              <p className="text-xs text-slate-500">
                                {student?.email}
                              </p>
                            </div>

                            <span
                              className={`text-xs font-medium px-3 py-1 rounded-full ${
                                submitted
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {submitted
                                ? "Submitted"
                                : "Not Submitted"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;