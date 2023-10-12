import express from 'express';
import {register, login} from '../controllers/auth_controller.js'
import Weather_Api from '../controllers/weather_controller.js';
import authenticateUser from '../middleware/authMiddleware.js'
const router = express.Router();

// Registration route
router.post('/register', register);
// Login route
router.post('/login', login);
// Weather route
router.get('/', authenticateUser ,Weather_Api);

export default router;