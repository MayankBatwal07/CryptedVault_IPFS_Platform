import multer from "multer";

const storage=()=>multer.memoryStorage();

const uploadUserImage=multer({storage:storage()}).single("file");

export default uploadUserImage;