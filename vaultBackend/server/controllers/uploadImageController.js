// import { ethers } from "ethers";
import UserModel from "../models/Users.js";
import { PINATA_APIKEY,PINATA_SECRETKEY } from "../config/serverConfig.js";
import pinataSDK from "@pinata/sdk";
import generateEncryptionKey from "../utils/generateKey.js";
import encryptFile from "../utils/encryption.js";


async function uploadImageController(req,res,next){
    try{
        console.log(req.file);
        const address=req.address;
        const userAddress=address.toLowerCase();
        const user=await UserModel.findOne({userAddress:userAddress});
        if(!user){
            throw new Error("User does not exist");
        }
        if(user.encryptionKey===null){
            const encryptionKey=generateEncryptionKey(32);
            user.encryptionKey=encryptionKey;
            await user.save();
        }

        const {encryptedData,iv}=encryptFile(req.file.buffer,user.encryptionKey);
        console.log(encryptedData);
        const pinata = new pinataSDK({ pinataApiKey: PINATA_APIKEY, pinataSecretApiKey: PINATA_SECRETKEY });
        const pinataRes = await pinata.pinJSONToIPFS({encryptedData,iv})
        console.log(pinataRes);
        
        res.status(200).json({ipfsHash:pinataRes.IpfsHash,messsage:"Image Uploaded"})

    }catch(err){
        res.status(500).json({messsage:"Internal Server Error"})
        
    }



}
export default uploadImageController;

