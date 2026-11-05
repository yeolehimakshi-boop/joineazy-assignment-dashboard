import { useState } from "react";
import { users } from "../data/mockdata";

function Login({ onLogin }) {
  const [selectedUser, setSelectedUser] = useState("");

  const handleLogin = () => {
    if (!selectedUser) {
      alert("Please select a user");
      return;
    }

    const user = users.find(
      (user) => user.id === Number(selectedUser)
    );

    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Joineazy
          </h1>

          <p className="text-slate-500 mt-2">
            Assignment & Review Dashboard
          </p>
        </div>

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Select User
        </label>

        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose a user</option>

          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} — {user.role}
            </option>
          ))}
        </select>

        <button
          onClick={handleLogin}
          className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Continue
        </button>

        
      </div>
    </div>
  );
}

export default Login;