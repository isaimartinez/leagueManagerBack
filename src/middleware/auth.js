import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const isAuthenticated = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(verified._id);
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access Denied' });
  }
  next();
};
