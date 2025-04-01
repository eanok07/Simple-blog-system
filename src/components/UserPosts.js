import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const { userId } = useParams(); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/posts/user/${userId}`);
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, [userId]);

  if (posts.length === 0) return <p>No posts found.</p>;

  return (
    <div className="container">
      <h2>Posts by User</h2>
      {posts.map((post) => (
        <div key={post._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p><strong>Author:</strong> {post.author.name}</p>
          <p><strong>Created At:</strong> {new Date(post.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default UserPosts;