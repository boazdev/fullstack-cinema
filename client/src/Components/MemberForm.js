import React, { useState } from 'react'
import { updateCinemaWS,postCinemaWS } from '../Utils/cinemaWsCRUD'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export const MemberForm = (props) => {
    const navigate= useNavigate()
    const storeData = useSelector(state=>state)
    const [memberObj,setMemberObj] =useState({name:props.isEdit?props.data.firstname:"",email:props.isEdit?props.data.email:""
            ,city:props.isEdit?props.data.city:""})

            const submitHandler = async (e) => {
                e.preventDefault()
                
              
                let resp = props.isEdit? await updateCinemaWS("members",props.data._id,memberObj,storeData.token) :await postCinemaWS("members",memberObj,storeData.token)
                if (resp.status==401)
                  {
                    navigate("/error/"+ resp.data.error)
                    return
                  }
                //console.log("response post:" +resp.toString())
             
                //console.log(checkedState)
                navigate("/homepage/subscriptions")
              }
  return (
    <>
    <form>
      
            <label>Name : </label><input type="text" defaultValue={props.isEdit ? props.data.name:""} onChange={(e) => setMemberObj({...memberObj, name:e.target.value})}/><br/>
            <label>Email : </label><input type="text" defaultValue={props.isEdit ? props.data.email:""} onChange={(e) => setMemberObj({...memberObj, email:e.target.value})}/><br/>
            <label>City : </label><input type="text" defaultValue={props.isEdit ? props.data.city:""} onChange={(e) => setMemberObj({...memberObj, city:e.target.value})}/><br/>
            
            <br/>
            <input type="submit" className='app-button' value={props.isEdit ? "Update":"Save"} onClick={submitHandler}/>
            <input type="button" className='app-button' value="Cancel" onClick={()=>navigate("/homepage/subscriptions")}/>
            
        </form>
    </>
  )
}
