import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { MovieForm } from '../../Components/MovieForm'
import { getCinemaWS } from '../../Utils/cinemaWsCRUD'

export const MovieEditPage = () => {
  const storeData= useSelector(state=>state)
  const params = useParams()
  const navigate=useNavigate()
  const [formData,setFormData]= useState(false)
  useEffect(
    () => {
              
      const fetchIt = async () => {
        //console.log("useEffect")
        let resp = await getCinemaWS("movies/"+params.id,storeData.token)
          if (resp.status==401)
            {
              navigate("/error/"+ resp.data.error)
              return
            }
            //console.log(resp.data)
            setFormData(resp.data)
          }
          fetchIt()
        },[]
  )
  
  
    return (
      <div style={{borderStyle:"solid", borderColor:"black", marginTop:"20px", width:"700px"}}>
    <h2>Movies</h2>
    {/* console.log(storeData.editData) */}
    <h3>Edit Movie : {formData.name}</h3>
      <div style={{ width:"390px", marginTop:"10px", borderStyle:"solid", borderColor:"black", marginBottom:"5px"}}>
      
      {formData!=false && <MovieForm isEdit={true} data={formData}/>
      }
      
      </div>
    </div>
    )  
}
