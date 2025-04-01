import React, { useState, useEffect } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="container">
      <h2>User Management</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <div key={user._id} style={{ margin: "10px 0", padding: "10px", border: "1px solid #ccc" }}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <button onClick={() => handleDelete(user._id)}>Delete User</button>
          </div>
        ))
      )}
    </div>
  );
};

export default UserManagement;