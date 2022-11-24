import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateCinemaWS,postCinemaWS } from '../Utils/cinemaWsCRUD'
import { permList } from '../Utils/permissionsUtils'
export const UserForm = (props) => { //props.isEdit, props.data
    const navigate= useNavigate()
  const storeData = useSelector(state=>state)
  const [userObj,setUserObj] = useState({firstname:props.isEdit?props.data.firstname:"",lastname:props.isEdit?props.data.lastname:""
        ,username:props.isEdit?props.data.username:"",sessionTimeOut:props.isEdit?props.data.sessionTimeOut:0,
        permissions:props.isEdit?props.data.permissions:[]})
  const submitHandler = async (e) => {
    e.preventDefault()
    
    let x={...userObj,permissions:[]}
    //console.log(x)
    Object.entries(checkedState).forEach(
      ([key, value]) =>  
      {if(value) 
        x.permissions.push(key)}/* value && userObj.permissions.insert(0,key) */
  );
  //console.log("object send:") 
  //console.log(x)

    let resp = props.isEdit? await updateCinemaWS("users",props.data.id,x,storeData.token) :await postCinemaWS("users",x,storeData.token)
    //console.log("response post:" +resp.toString())
 
    //console.log(checkedState)
    navigate("/homepage/users")
  }

  const fillObj =() =>
  {
    let dict ={}
    if(props.isEdit)
        permList.forEach(item=>props.data.permissions.includes(item)?dict[item]=true:dict[item]=false)
    else
        permList.forEach(item=>dict[item]=false)
    return dict
  }
  const [checkedState, setCheckedState] = useState(fillObj());


  const handleCheckChange = (e) => {
    let newState= {...checkedState}
      newState[e.target.value] = !newState[e.target.value]
    
     if(e.target.value.includes("Movies") && newState[e.target.value]==true) 
         newState["View Movies"] = true
     else if(e.target.value.includes("Subscriptions") && newState[e.target.value]==true)
          newState["View Subscriptions"] = true

    setCheckedState(newState);
  }
    return (
    <>
    <form>
            <label>First Name : </label><input type="text" defaultValue={props.isEdit ? props.data.firstname:""} onChange={(e) => setUserObj({...userObj, firstname:e.target.value})}/><br/>
            <label>Last Name : </label><input type="text" defaultValue={props.isEdit ? props.data.lastname:""} onChange={(e) => setUserObj({...userObj, lastname:e.target.value})}/><br/>
            <label>User Name : </label><input type="text" defaultValue={props.isEdit ? props.data.username:""} onChange={(e) => setUserObj({...userObj, username:e.target.value})}/><br/>
            <label>Session time out(Minutes) : </label>
              <input type="text" defaultValue={props.isEdit ? props.data.sessionTimeOut:""} 
                onChange={(e) => setUserObj({...userObj, sessionTimeOut:+e.target.value})}/><br/>
                {props.isEdit && <><label>Created data : {props.data.createDate}</label><br/></>}
            <label>Permissions : </label><br/>
            {permList.map((item,index)=><div key={index}><input type="checkbox" value={item} onChange=
            {handleCheckChange} checked={checkedState[item]}/><label>{item}  </label> </div>)}
           
            <br/><br/>
            <input type="submit" className='app-button' value="Save" onClick={submitHandler}/>
            <input type="button" className='app-button' value="Cancel" onClick={()=>navigate("/homepage/users")}/>
            
        </form>
    </>
  )
}
