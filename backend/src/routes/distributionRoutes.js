import express from "express";
import { getDistributedData, saveDistributedData } from "../controller/distributionController.js";  


const distributionRoutes = express.Router();

distributionRoutes.post("/save", saveDistributedData); 
distributionRoutes.get("/fetch", getDistributedData ); 

export default distributionRoutes;
