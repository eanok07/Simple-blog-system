const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["super_admin", "admin", "user"], default: "user" }, // Add role field
});

module.exports = mongoose.model("User", UserSchema);