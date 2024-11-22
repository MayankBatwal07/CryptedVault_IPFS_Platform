import axios from "axios";
import UserModel from "../models/Users.js";
import decryptData from "../utils/decrypption.js";
const PINATA_GATEWAY="https://gateway.pinata.cloud/ipfs/"

async function returnIpfsResponse(ipfsHash){
    const res=await axios.get(`${PINATA_GATEWAY}${ipfsHash}`)
    return res.data;
}

const getImageController =async(req,res,next) => {
    try {
        const address=req.address;
        const userAddress=address.toLowerCase();
        const user=await UserModel.findOne({userAddress:userAddress});
        if(!user){
            throw new Error("User does not exist");
        }

        const {page,limit}=req.query;
        const pageNumber=parseInt(page) || 1;
        const limitNumber=parseInt(limit) ||1;
        if(pageNumber<1 || limitNumber<1){
            throw new Error("Invalid page number or limit number");
        }
        const startIndex=(pageNumber-1)*limitNumber;
        const endIndex=(pageNumber*limitNumber)
        const ipfsHashArray=req.body.slice(startIndex,Math.min(req.body.length,endIndex));
        console.log(ipfsHashArray);
        const decryptedImageDataArr=[];
        if(ipfsHashArray.length!==0){
            const encryptedDataArr=await Promise.all(ipfsHashArray.map(async(ipfsHash)=>{
                const res=await returnIpfsResponse(ipfsHash);
                return res;
            }))

            for(const img of encryptedDataArr) {
                const decryptedImgData=decryptData(img.encryptedData,img.iv,user.encryptionKey);
                decryptedImageDataArr.push(decryptedImgData.toString('base64'))
                
            }

        }
        console.log(decryptedImageDataArr);

        res.status(200).json({message:"Image sent", decryptedImageDataArr})

    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal Server Error"})
        
    }
}
 
export default getImageController;