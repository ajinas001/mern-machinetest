import express from "express";
import { getDistributedData, saveDistributedData } from "../controller/distributionController.js";  
import { verifyToken } from "../middleware/Checkauth.js";


const distributionRoutes = express.Router();

distributionRoutes.post("/save",verifyToken, saveDistributedData); 
distributionRoutes.get("/fetch",verifyToken, getDistributedData ); 

export default distributionRoutes;
