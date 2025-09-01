import { useEffect } from "react"
const env = import.meta.env;

export const useServerStart = () =>{
    useEffect(()=>{
        const warmUp = async ()=>{
            try {
                await fetch(`${env.VITE_SERVER_URL}/api/ready`,{cache:"no-store"});
                console.log("Server is alive")
            } catch {
                console.log("Server crashed")
            }
        }
        warmUp();
    },[]);
}