import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
    },
    user_type: {
      type: String,
      default: "paid",
    },
    refresh_token: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: null,
    },
    last_login: {
      type: String,
      default: null,
    },
    created_at: {
      type: String,
      required: true,
    },
  },
  {
    collection: "users",
    timestamps: false,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
