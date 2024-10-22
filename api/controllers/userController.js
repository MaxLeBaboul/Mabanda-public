import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

dotenv.config();


// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if(!name ||!email ||!password ||!role) return res.status(400).json({ message: 'All fields are required'});
 try {
  const existingUser = await User.findOne({ where: { email}})

  if(existingUser) return res.status(400).json({message: 'User already exists'});

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashedPassword, role });

  res.json({ message: 'User registered successfully', user: newUser });

 } catch (error) {
  res.status(500).json({error: 'Server error'});
 }
};

// Login an existing user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: 'Invalid password credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    console.log({token});
    

    res.json({ message: 'User logged in successfully', token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};