import express from 'express'
import { addUser, deleteUser, editUser, fetchUsers, uploadFile, } from '../controller/userController.js';
import upload from '../utils/multer.js';
import { verifyToken } from '../middleware/Checkauth.js';



const userRoutes = express.Router();

// Route: POST /api/auth/login
userRoutes.get('/fetch', verifyToken, fetchUsers);
userRoutes.post('/add', verifyToken, addUser);
userRoutes.post('/delete', verifyToken, deleteUser);
userRoutes.put('/edit', verifyToken, editUser);
userRoutes.post('/upload', verifyToken, upload.single('file'), uploadFile);


export default userRoutes