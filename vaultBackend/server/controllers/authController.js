import { ethers } from "ethers";
import UserModel from "../models/Users.js";
import jwt from "jsonwebtoken";
import { JWT_SECRETKEY } from "../config/serverConfig.js";

async function authController(req,res,next){
    try{
        const {signature}=req.body;
        const {address}=req.query;
        if(!signature){
            throw new Error("Signature is Invalid");
        }
        const recoveredAddress=ethers.utils.verifyMessage("Welcome to Crypto Vault Website",signature);
        if(address.toLowerCase()===recoveredAddress.toLowerCase()){
            const address=recoveredAddress.toLowerCase();
            const user=await UserModel.findOne({userAddress:address});
            if(!user){
                const newUser=await UserModel.create({userAddress:address});
                // console.log(newUser);
            }
            const token=jwt.sign({
                address

            },JWT_SECRETKEY);
            res.status(200).json({message:"Authentication Successful",token})
        }else{
            res.status(400).json({message:"Authentication Failed"})
        }

        // console.log(recoveredAddress);

    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error!"})
    }



}
export default authController;

