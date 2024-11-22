import axios from "axios";
import { useWeb3Context } from "../contexts/useWeb3Context";
import { useState,useEffect } from "react";
import toast from "react-hot-toast";
import { CircleArrowLeft,CircleArrowRight } from "lucide-react";


const GetImage = ({reload}) => {
    const [currentPage,setCurrentPage]=useState(1);
    const [imagePerPage,setImagePerPage]=useState(2);
    const [loading,setLoading]=useState(false);
    const [images,setImages]=useState([]);
    const {web3State}=useWeb3Context();
    const {selectedAccount,contractInstance}=web3State;

    useEffect(()=>{
        try {
            const getImageHashes=async()=>{
                const ipfsHashes=await contractInstance.viewFiles(selectedAccount);
                return ipfsHashes;
        
            }
        
            const getImage=async()=>{
                setLoading(true);
                const ipfsHashes=await getImageHashes();
                const ipfsHashesArray=Object.values(ipfsHashes)
                const url=`http://localhost:8540/api/getImage?page=${currentPage}&limit=${imagePerPage}`;
                const token=localStorage.getItem("token");
                const config={
                    headers:{
                        "x-access-token":token
                    }
                }
                const res=await axios.post(url,ipfsHashesArray,config);
                const imagesData=res.data.decryptedImageDataArr;
                setImages(imagesData);
                setLoading(false);
                console.log(res);
                console.log(ipfsHashesArray);
        
            }
            contractInstance && getImage();
            
        } catch (error) {
            toast.error("Error Fetching Image");
            
        }finally{
            setLoading(false)
        }

    },[contractInstance, currentPage, imagePerPage,selectedAccount,reload])
    
    const paginate=(pageNumber)=>(setCurrentPage(pageNumber));

    return ( <>
    {   !loading?(
        images.length>0?
        (
            images.map((imgData,index)=>{
            return <img key={index} src={`data:image/jpeg;base64,${imgData}`}></img>

        })
        ):
        (<p>No Image Found</p>)):<p>Loading...</p>
    }
    
    <div className="w-full h-20 flex justify-center items-center gap-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1 || loading}
        >
          <CircleArrowLeft className="w-8 h-8 opacity-80" />
        </button>
        <span className="font-bold text-[24px]">{currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={loading}>
          <CircleArrowRight className="w-8 h-8 opacity-80" />
        </button>
    </div>
    
    </> );
}
 
export default GetImage;