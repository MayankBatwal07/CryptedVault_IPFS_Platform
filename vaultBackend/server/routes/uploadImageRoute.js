import express from "express";
import uploadImageController from "../controllers/uploadImageController.js";
import uploadUserImage from "../middleware/multer.js";
import authenticateToken from "../middleware/authenticateToken.js";
const router=express.Router();

router.post("/uploadImage",authenticateToken,uploadUserImage,uploadImageController)

export default router;