import axios from "axios";
import { useNavigate } from "react-router-dom";
const wsUrl = "http://localhost:8080/"


export const getCinemaWS = async (path,token) => {
   // const navigate= useNavigate()
    try {
            let resp = await axios.get(wsUrl+path,{headers: {
                "x-access-token": token,
               "Content-Type":"application/json"
               
            }})
            return resp 
        }
        
    
    
     catch (error) {
        console.log("get request error")
        console.log(error)
        //navigate("/error/"+error.data)
        return error.response
    }
}

export const postCinemaWS = async (path,obj,token) => {
    try {
            let resp = await axios.post(wsUrl+path,obj,{headers: {
                "x-access-token": token,
               "Content-Type":"application/json"
            }})
            return resp 
        }
     catch (error) {
        console.log("post request error")
        console.log(error)
        return error.response
    }
}

export const updateCinemaWS = async (path,id,obj,token) => {
    try {
            let resp = await axios.put(wsUrl+path+"/"+id,obj,{headers: {
                "x-access-token": token,
               "Content-Type":"application/json"
            }})
            return resp 
        }
     catch (error) {
        console.log("update request error")
        console.log(error)
        return error.response
    }
}

export const deleteCinemaWS = async (path,id,token) => {
    try {
            let resp = await axios.delete(wsUrl+path+'/'+id,{headers: {
                "x-access-token": token,
               "Content-Type":"application/json"
            }})
            return resp 
        }
     catch (error) {
        console.log("update request error")
        console.log(error)
        return error.response
    }
}