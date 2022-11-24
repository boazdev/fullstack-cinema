import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { MemberForm } from '../../Components/MemberForm'
import { getCinemaWS } from '../../Utils/cinemaWsCRUD'

export const MemberEditPage = () => {
const storeData= useSelector(state=>state)
const params = useParams()
const navigate=useNavigate()
const [formData,setFormData]= useState({})
useEffect(
  () => {
            
    const fetchIt = async () => {

      let resp = await getCinemaWS("members/"+params.id,storeData.token)
        if (resp.status==401)
          {
            navigate("/error/"+ resp.data.error)
            return
          }
          setFormData(resp.data)
        }
        fetchIt()
      },[]
)


  return (
    <div style={{borderStyle:"solid", borderColor:"black", marginTop:"20px", width:"700px"}}>
    <h2>Members</h2>
    {/* console.log(storeData.editData) */}
    <h3>Edit Member : {formData.name}</h3>
      <div style={{ width:"390px", marginTop:"10px", borderStyle:"solid", borderColor:"black", marginBottom:"5px"}}>
      
      <MemberForm isEdit={true} data={formData}/* {storeData.editData} *//>
      
      </div>
    </div>
  )
}
