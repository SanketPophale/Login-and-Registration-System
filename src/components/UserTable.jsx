import React, { useEffect, useState } from "react";
import axios from "axios";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("token");
        
            if (!token) {
                console.error("No token found in localStorage!");
                setError("Please log in first.");
                setLoading(false);
                return;
            }
        
            try {
                const response = await axios.get("http://localhost:5000/api/valid/protected", {
                    headers: { Authorization: `Bearer ${token}` },
                });
        
                console.log("API Response:", response.data);
                setUsers(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                console.error("API Error:", err.response?.data || err.message);
                setError("Failed to fetch users. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchUsers();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div></div>;
    if (error) return <p className="text-red-600 bg-red-100 border border-red-400 p-3 rounded-md max-w-md mx-auto">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Logged-in Users</h2>

            {users.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left">#</th>
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className="border-b hover:bg-gray-100 transition">
                                    <td className="px-6 py-3">{index + 1}</td>
                                    <td className="px-6 py-3">{user.name || "N/A"}</td>
                                    <td className="px-6 py-3">{user.email || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-600 text-center p-4 bg-gray-100 rounded-md">No users found.</p>
            )}
        </div>
    );
};

export default UserTable;
