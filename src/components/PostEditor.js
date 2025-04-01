import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3001/api/posts",
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Post created successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  return (
    <div className="container">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default PostEditor;