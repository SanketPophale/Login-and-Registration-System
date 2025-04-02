import React, { useState, useEffect } from "react";
import axios from "axios";
import { MailIcon, LockClosedIcon } from "@heroicons/react/solid";

const AuthForm = ({ setIsLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Response Data:", response.data);
      alert(response.data.message); // Show a success message

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Save token
        window.location.href = "/dashboard"; // Redirect to dashboard
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-cyan-700 to-blue-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-96 text-white relative">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-cyan-400 px-6 py-2 rounded-full text-black text-lg font-semibold">
          SIGN IN
        </div>
        <div className="flex flex-col items-center mb-6 mt-6">
          <div className="bg-gray-700 p-4 rounded-full w-20 h-20 flex items-center justify-center border-4 border-cyan-500">
            <MailIcon className="w-10 h-10 text-white" />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-3">
            <MailIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none border border-gray-600"
              required
            />
          </div>
          <div className="relative mb-3">
            <LockClosedIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none border border-gray-600"
              required
            />
          </div>
          <div className="flex justify-between items-center text-sm text-gray-400 my-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-1" /> Remember me
            </label>
            <a href="#" className="hover:text-cyan-400">
              Forgot your password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black py-2 rounded-md mt-3 text-lg font-semibold shadow-md"
          >
            LOGIN
          </button>
        </form>
      </div>
      <div className="mt-4">
        <button
          onClick={() => setIsLogin(false)}
          className="text-cyan-400 hover:text-cyan-300 underline text-sm"
        >
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/auth/logged-in-users", {
          headers: { Authorization: token },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error.response?.data || error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Logged-In Users</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="border border-gray-300 px-4 py-2 text-center">
                No logged-in users
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? <AuthForm setIsLogin={setIsLogin} /> : <Dashboard />;
};

export default App;
