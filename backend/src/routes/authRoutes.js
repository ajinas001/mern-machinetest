import express  from 'express'
import  loginUser  from '../controller/authController.js';


const authRoutes = express.Router();

// Route: POST /api/auth/login
authRoutes.post('/login', loginUser);


export default authRoutes