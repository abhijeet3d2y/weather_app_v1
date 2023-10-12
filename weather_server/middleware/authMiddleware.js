import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const authenticateUser = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers['authorization']; // Extract the token from the request headers

  // If no token is provided, return an unauthorized status
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, SECRET_KEY);

    // Set the user ID in the request for further use
    req.user = decoded;

    // Continue to the next middleware or route
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

export default authenticateUser;
