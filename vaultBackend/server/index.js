import express from "express";
import authenticationRoute from './routes/authenticationRoute.js';
import uploadImageRoute from './routes/uploadImageRoute.js';
import getImageRoute from "./routes/getImageRoute.js"
import connectDB from "./db/connect.js";
import cors from "cors";
import {MONGODB_URL} from "./config/serverConfig.js"


const PORT=8540;

const app=express();
app.use(express.json())
app.use(cors());
app.use('/api',authenticationRoute) 
app.use('/api',uploadImageRoute) 
app.use('/api',getImageRoute);
app.get("/",(req,res)=>{
    res.send("Running")
    console.log("Running");

});

async function serverStart(){
    try {
        await connectDB(MONGODB_URL)
        console.log("Connected To Database");
        app.listen(PORT,()=>{
        console.log(`Server Running in port ${PORT}`)
    })
    } catch (error) {
        console.log(error);
    }

}

serverStart();

