import express  from 'express'
import { addUser, deleteUser, editUser, fetchUsers, uploadFile, } from '../controller/userController.js';
import upload from '../utils/multer.js';



const userRoutes = express.Router();

// Route: POST /api/auth/login
userRoutes.get('/fetch', fetchUsers);
userRoutes.post('/add', addUser);
userRoutes.post('/delete', deleteUser);
userRoutes.put('/edit', editUser);
userRoutes.post('/upload', upload.single('file'), uploadFile); 


export default userRoutes