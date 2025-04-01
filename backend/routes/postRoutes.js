const express = require("express");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Post (Admins and Super Admins only)
router.post("/", authMiddleware(["admin", "super_admin"]), async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = new Post({ title, content, author: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Get All Posts (All roles can access)
router.get("/", authMiddleware(), async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

module.exports = router;