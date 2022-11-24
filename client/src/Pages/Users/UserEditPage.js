import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate ,useParams} from 'react-router-dom'
import { UserForm } from '../../Components/UserForm'
import { updateCinemaWS } from '../../Utils/cinemaWsCRUD'
import { permList } from '../../Utils/permissionsUtils'

export const UserEditPage = () => {
  const navigate= useNavigate()
  const storeData = useSelector(state=>state)
  
  return (
    <div style={{borderStyle:"solid", borderColor:"black", marginTop:"20px", width:"700px"}}>
      <h2>Users</h2>
      <h3>Edit user : {storeData.editData.firstname + " " +storeData.editData.lastname}</h3>
        <div style={{ width:"390px", marginTop:"10px", borderStyle:"solid", borderColor:"black", marginBottom:"5px"}}>
        
        <UserForm isEdit={true} data={storeData.editData}/>
        
        </div>
      </div>
  )
}
