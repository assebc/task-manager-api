const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const doesEmailExist = await User.findOne({ email });
    if (doesEmailExist) {
      return res.status(400).json({ error: 'Eamil is already registered' });
    }

    const user = await User.create({ username, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
}

async function logout(_, res) {
  res.status(200).json({ message: 'Logged out (client should delete JWT)' });
}

module.exports = {
  register,
  login,
  logout
};
