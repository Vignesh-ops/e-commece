import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, user_type } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const user = new User({
      name,
      email,
      password, 
      role: role || undefined,
      user_type: user_type || undefined,
      created_at: new Date().toISOString()
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully!", user });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};
