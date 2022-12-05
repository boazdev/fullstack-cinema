import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MenuButton } from '../../Components/MenuButton'
import { deleteCinemaWS } from '../../Utils/cinemaWsCRUD'
import { setEditData } from '../../Utils/userSlice'
import { SubscriberItem } from './SubscriberItem'

export const MovieItem = (props) => {
    const storeData= useSelector(state=>state)
    const navigate = useNavigate()
    const dispatch= useDispatch()
    const [isDelete,setIsDelete] = useState(false)
    const deleteHandler =  async () =>{
      //console.log(props.data._id)
      let resp = await deleteCinemaWS("movies",props.data._id,storeData.token)
      setIsDelete(true)
     
    }
    const editHandler = () => {
      dispatch(setEditData(props.data))
      navigate("/homepage/editmovie/"+props.data._id)
    }

    return (
      <>
      {!isDelete &&
        <div style={{marginTop:"10px", borderStyle:"solid", borderColor:"black", marginBottom:"5px"}}>
          <span style={{fontSize:"20px"}}><b>{props.data.name+" , "+props.data.premiered.substring(0,4)}</b></span><br/>
          <span>genres : {"\""+props.data.genres.join("\", \"")+"\""}</span><br/>
          <div style={{marginTop:"10px"}}>
            <img src={props.data.image} width={"25%"} height={"auto"}/>
          {props.data.members.length!=0 && <SubscriberItem data={props.data.members}/>}
          </div>
          
          <br/>
          {storeData.permissionList.includes("Update Movies") && <MenuButton value="Edit" isSelect={false} callback={editHandler}/>}
          {storeData.permissionList.includes("Delete Movies") &&<MenuButton value="Delete" isSelect={false} callback={deleteHandler}/>}
          <br/>
          
      </div>
      }</>
    )
}
