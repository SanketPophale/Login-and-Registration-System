import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MailIcon, LockClosedIcon, UserIcon } from '@heroicons/react/solid';


const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", { username, email, password, dob });
      alert("Registration successful!");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-sm w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <div className="flex items-center border border-gray-300 rounded mt-2">
              <UserIcon className="w-5 h-5 text-gray-400 ml-2" />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 pl-10 border-none focus:outline-none rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center border border-gray-300 rounded mt-2">
              <MailIcon className="w-5 h-5 text-gray-400 ml-2" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 pl-10 border-none focus:outline-none rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="flex items-center border border-gray-300 rounded mt-2">
              <LockClosedIcon className="w-5 h-5 text-gray-400 ml-2" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 pl-10 border-none focus:outline-none rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded mt-4"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account? <a href="/login" className="text-blue-600">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
