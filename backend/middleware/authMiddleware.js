import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, env.JWT_SECRET);

      // Attach decoded payload (admin id) to request object
      req.admin = { id: decoded.id };

      return next();
    } catch (error) {
      res.status(401);
      return next(new Error('Not authorized, token validation failed'));
    }
  }

  if (!token) {
    res.status(401);
    return next(new Error('Not authorized, no token provided'));
  }
};

export default protect;
