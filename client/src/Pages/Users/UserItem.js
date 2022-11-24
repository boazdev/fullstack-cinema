import React, { useState } from 'react'
import { MenuButton } from '../../Components/MenuButton'
import { useSelector } from 'react-redux'
import { deleteCinemaWS } from '../../Utils/cinemaWsCRUD'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setEditData } from '../../Utils/userSlice'
export const UserItem = (props) => {
  const storeData= useSelector(state=>state)
  const navigate = useNavigate()
  const dispatch= useDispatch()
  const [isDelete,setIsDelete] = useState(false)
  const deleteHandler =  async () =>{
    let resp = await deleteCinemaWS("users",props.data.id,storeData.token)
    setIsDelete(true)
   //navigate(0)
    /*  console.log("deelte response:")  
    console.log(resp) */
  }
  const editHandler = () => {
    dispatch(setEditData(props.data))
    navigate("/homepage/edituser/"+props.data.id)
  }
  return (
    <>
    {!isDelete &&
      <div style={{marginTop:"10px", borderStyle:"solid", borderColor:"black", marginBottom:"5px"}}>
        <span>Name : {props.data.firstname+" " +props.data.lastname}</span><br/>
        <span>User Name : {props.data.username}</span><br/>
        <span>Session time out(minutes) : {props.data.sessionTimeOut}</span><br/>
        <span>Created data : {props.data.createDate}</span><br/>
        <span>Permissions : {props.data.permissions.join(", ")}</span><br/>
        <br/>
        <MenuButton value="Edit" isSelect={false} callback={editHandler}/>
        <MenuButton value="Delete" isSelect={false} callback={deleteHandler}/>
    </div>
    }</>
    
  )
}
