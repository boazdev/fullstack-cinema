import React, { useEffect, useState } from 'react'
import { MenuButton } from '../Components/MenuButton'
import { Outlet, useNavigate} from 'react-router-dom'
export const UsersPage = () => {
  const navigate = useNavigate()
  
  const [menuOption,setMenuOption] = useState("all users")
  useEffect(
    ()=>{
     
      /* console.log("render users")
      console.log(document.location.pathname) */
      if(document.location.pathname==="/homepage/users")
        setMenuOption("all users")
    },
  )
  const menuSelectHandler = (e) => {
    let lowerStr =e.target.value.toLowerCase()
    
    setMenuOption(lowerStr)
    if(lowerStr==="add user")
      navigate(lowerStr)
    else
      navigate("")
  }
  return (
    <div style={{borderStyle:"solid", borderColor:"black", marginTop:"20px", width:"700px"}}>
      <h2>Users</h2>
      <MenuButton isSelect={menuOption==="all users"} value="All Users"  callback={menuSelectHandler}/>
      <MenuButton isSelect={menuOption==="add user"} value="Add User" callback={menuSelectHandler}/><br/>
      <Outlet/>
      </div>
  )
}
