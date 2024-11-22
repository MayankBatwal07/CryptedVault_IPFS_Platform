import express from "express";
import getImageController from "../controllers/getImageController.js";
import authenticateToken from "../middleware/authenticateToken.js";
const router=express.Router();

router.post('/getImage',authenticateToken,getImageController)

export default router;