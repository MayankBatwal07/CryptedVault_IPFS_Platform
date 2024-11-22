import { useWeb3Context } from "../contexts/useWeb3Context";
import UploadImage from "../components/UploadImage";
import GetImage from "../components/GetImage";
import { useState } from "react";


const Home = () => {
    const [reload,setReload]=useState(false);

    const reloadEffect=()=>{
        setReload(!reload);
    }
    
    return ( 
    <div className="relative h-full w-screen flex flex-col justify-center items-center mt-8 px-4 ">
        <GetImage reload={reload}/>
        <UploadImage reloadEffect={reloadEffect}/></div> );
}
 
export default Home;