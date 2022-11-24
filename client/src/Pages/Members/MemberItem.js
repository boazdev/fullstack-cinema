import React, { useState } from 'react'
import { MenuButton } from '../../Components/MenuButton'
import { useSelector } from 'react-redux'
import { deleteCinemaWS } from '../../Utils/cinemaWsCRUD'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setEditData } from '../../Utils/userSlice'
import { SubscribeItem } from './SubscribeItem'

export const MemberItem = (props) => {
    const storeData= useSelector(state=>state)
  const navigate = useNavigate()
  const dispatch= useDispatch()
  const [isDelete,setIsDelete] = useState(false)
  const deleteHandler =  async () =>{
    console.log(props.data._id)
    let resp = await deleteCinemaWS("members",props.data._id,storeData.token)
    setIsDelete(true)
   //navigate(0)
    /*  console.log("deelte response:")  
    console.log(resp) */
  }
  const editHandler = () => {
    dispatch(setEditData(props.data))
    navigate("/homepage/editmember/"+props.data._id)
  }
  return (
    <>
    {!isDelete &&
      <div style={{marginTop:"10px", borderStyle:"solid", borderColor:"black", marginBottom:"5px"}}>
        <h2>{props.data.name}</h2>
        <span>Email : {props.data.email}</span><br/>
        <span>City : {props.data.city}</span><br/>
      
        <br/>
        {storeData.permissionList.includes("Update Subscriptions") && <MenuButton value="Edit" isSelect={false} callback={editHandler}/>}
        {storeData.permissionList.includes("Delete Subscriptions") &&<MenuButton value="Delete" isSelect={false} callback={deleteHandler}/>}
        <br/>
        <SubscribeItem id={props.data._id} watchList={props.data.movies}/>
    </div>
    }</>
  )
}
