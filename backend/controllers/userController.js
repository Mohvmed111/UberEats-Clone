import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

// Create JWT Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register Controller
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Create user directly (assume middleware handles validation, hashing, etc.)
    const newUser = await User.create({ name, email, password, role });

    // Generate token
    const token = createToken(newUser._id);

    // Return success response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
      token
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Login Controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Assume middleware handles fetching user and password validation
    const user = req.user;

    // Create token
    const token = createToken(user._id);

    // Send response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
