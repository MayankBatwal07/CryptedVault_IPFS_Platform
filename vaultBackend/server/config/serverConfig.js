import 'dotenv/config'
// import dotenv from "dotenv";
// dotenv.config();
const MONGODB_URL=process.env.MONGODB_URL ;
const PORT=process.env.PORT || 3000;
const PINATA_APIKEY=process.env.PINATA_APIKEY
const PINATA_SECRETKEY=process.env.PINATA_SECRETKEY
const JWT_SECRETKEY=process.env.JWT_SECRETKEY
export {MONGODB_URL,PORT,JWT_SECRETKEY,PINATA_APIKEY,PINATA_SECRETKEY}
