import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import authRoutes from './src/routes/authRoutes.js';
import connectDB from './src/config/db.js';
import userRoutes from './src/routes/userRoutes.js';
import distributionRoutes from './src/routes/distributionRoutes.js';
import cookieParser from 'cookie-parser';




const app = express();

// Enable CORS
app.use(cors({
    origin: "http://localhost:3000", // Match your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());
// Connect Database
connectDB();
// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/distribution', distributionRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
