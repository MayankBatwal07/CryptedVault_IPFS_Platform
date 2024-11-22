import {ethers} from "ethers";
import { contractAbi } from "../constant/contractAbi";
import toast from "react-hot-toast";
import axios from "axios";

export const connectWallet=async ()=>{
    try{
        if(!window.ethereum){
            throw new Error("Metamask not Installed");
        }
        const accounts=await window.ethereum.request({
            method:"eth_requestAccounts"
        })
        // console.log(accounts[0]);
        const selectedAccount=accounts[0];
        const provider=new ethers.BrowserProvider(window.ethereum);
        const signer=await provider.getSigner();

        const message="Welcome to Crypto Vault Website";
        const signature=await signer.signMessage(message);
        // console.log(signature);

        const dataSignature={
            signature
        }

        const url=`http://localhost:8540/api/authentication?address=${selectedAccount}`
        const res=await axios.post(url,dataSignature);
        console.log(res.data.token);
        const token=res.data.token;
        localStorage.setItem("token",token);

        const contractAddress="0xd8a17c40fb3235e7639305379e37dd7d43664cfc";
        const contractInstance=new ethers.Contract(contractAddress,contractAbi,signer)
        return {contractInstance,selectedAccount}
    }catch(err){
        toast.error("Wallet connection Failed")
        console.log(err);
        console.error(err);
    }
}