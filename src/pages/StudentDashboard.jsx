import { useState } from "react";

function StudentDashboard({
  user,
  assignments,
  onSubmitAssignment,
  onLogout,
}) {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const myAssignments = assignments.filter((assignment) =>
    assignment.assignedTo.includes(user.id)
  );

  const filteredAssignments = myAssignments.filter((assignment) => {
  const matchesSearch = assignment.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const isSubmitted = assignment.submissions[user.id];

  const matchesStatus =
    statusFilter === "all" ||
    (statusFilter === "submitted" && isSubmitted) ||
    (statusFilter === "pending" && !isSubmitted);

  return matchesSearch && matchesStatus;
});

  const submittedCount = myAssignments.filter(
    (assignment) => assignment.submissions[user.id]
  ).length;

  const handleSubmitClick = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleConfirmSubmission = () => {
    if (selectedAssignment) {
      onSubmitAssignment(selectedAssignment.id, user.id);
      setSelectedAssignment(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {}
      <header className="bg-white border-b px-4 sm:px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Student Dashboard
          </h1>

          <p className="text-sm text-slate-500">
            Welcome, {user.name}
          </p>
        </div>

        <button
          onClick={onLogout}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Logout
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-4 sm:p-8">
        {/* Overall Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <p className="text-sm text-slate-500">
            Overall Progress
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-1">
            {submittedCount} of {myAssignments.length}
          </h2>

          <div className="mt-4 h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{
                width:
                  myAssignments.length > 0
                    ? `${(submittedCount / myAssignments.length) * 100}%`
                    : "0%",
              }}
            />
          </div>
        </div>

        {}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
  <h2 className="text-xl font-bold text-slate-800">
    My Assignments
  </h2>

  <div className="flex flex-col sm:flex-row gap-3">
    <input
      type="text"
      placeholder="Search assignments..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
    />

    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="all">All</option>
      <option value="pending">Pending</option>
      <option value="submitted">Submitted</option>
    </select>
  </div>
</div>

        {myAssignments.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-slate-500">
            No assignments available.
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredAssignments.map((assignment) =>  {
              const isSubmitted =
                assignment.submissions[user.id];
                 const isOverdue =
                 new Date(assignment.dueDate) < new Date() && !isSubmitted;

              return (
                <div
                  key={assignment.id}
                  className="bg-white rounded-2xl shadow-sm p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">
                        {assignment.title}
                      </h3>

                      <p className="text-slate-600 mt-2">
                        {assignment.description}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isSubmitted
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {isSubmitted
                        ? "Submitted"
                        : "Not Submitted"}
                    </span>
                  </div>

                <div
                    className={`mt-5 text-sm ${isOverdue ? "text-red-600 font-medium" : "text-slate-500"}`}>
                    Due: {assignment.dueDate}

                    {isOverdue && (
                     <span className="ml-2 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                      Overdue
                     </span>
                    )}
                </div>

                  <a
                    href={assignment.driveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-4 text-blue-600 hover:underline"
                  >
                    Open Drive Link →
                  </a>

                  {}
                  <div className="mt-5">
                    {!isSubmitted ? (
                      <button
                        onClick={() =>
                          handleSubmitClick(assignment)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
                      >
                        Yes, I have submitted
                      </button>
                    ) : (
                      <div className="text-green-700 font-medium text-sm">
                        ✓ Assignment submitted
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-slate-800">
              Confirm Submission
            </h2>

            <p className="text-slate-600 mt-3">
              Have you completed and submitted{" "}
              <strong>{selectedAssignment.title}</strong>?
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => setSelectedAssignment(null)}
                className="flex-1 border border-slate-300 text-slate-700 px-4 py-2.5 rounded-lg font-medium hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmSubmission}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium"
              >
                Confirm Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;