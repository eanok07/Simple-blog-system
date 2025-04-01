import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/posts", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  if (!user) return <h2>Please log in to access the dashboard</h2>;

  return (
    <div className="container">
      <h2>Welcome, {user.name}!</h2>

      {/* Show Create Post button for Admins and Super Admins */}
      {(user.role === "admin" || user.role === "super_admin") && (
        <button onClick={() => navigate("/posts/create")}>Create Post</button>
      )}

      {/* Show User Management link for Super Admins */}
      {user.role === "super_admin" && (
        <div style={{ margin: "20px 0" }}>
          <Link to="/user-management">Manage Users</Link>
        </div>
      )}

      {/* Display Posts */}
      <div>
        <h3>Recent Posts</h3>
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} style={{ margin: "10px 0", padding: "10px", border: "1px solid #eee" }}>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <p><small>By: {post.author.name}</small></p>
              <p><small>Posted on: {new Date(post.createdAt).toLocaleString()}</small></p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;