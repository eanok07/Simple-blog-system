const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "member" }, // Default role is 'member'
});

// Prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;