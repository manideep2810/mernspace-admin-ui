import { Outlet } from "react-router-dom"
import { useAuthStore } from "../../store"
import { useQuery } from "@tanstack/react-query";
import { self } from "../http/api";
import { useEffect } from "react";
import { AxiosError } from "axios";


const getSelf = async ()=>{
    const { data } = await self();
    return data;
}


const Root = () => {
    const {setUser} = useAuthStore();
    
    const { data , isLoading } = useQuery({
        queryKey : ['self'],
        queryFn : getSelf,
        retry: (failureCount: number, error) => {
            if (error instanceof AxiosError && error.response?.status === 401) {
                return false;
            }
            return failureCount < 3;
        },
    })

    useEffect(()=>{
        if(data){
            // console.log(data);
            setUser(data);
            // console.log(user);
        }
    },[data,setUser])

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default Root