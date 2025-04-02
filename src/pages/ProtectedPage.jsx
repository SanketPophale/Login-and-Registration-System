import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedPage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('No token found. Please login.');
        window.location.href = '/login';
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/protected', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching protected data:', error);
        alert('Authorization failed. Please login again.');
        window.location.href = '/login';
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Protected Page</h1>
      <p>{message}</p>
    </div>
  );
};

export default ProtectedPage;
