import React, { useEffect, useState } from 'react'
import { MenuButton } from '../Components/MenuButton'
import { Outlet, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'


export const SubscriptionsPage = () => {
  const navigate = useNavigate()
  const storeData= useSelector(state=>state)
  const [menuOption,setMenuOption] = useState("all members")
  useEffect(
    ()=>{
     
      if(document.location.pathname==="/homepage/subscriptions")
        setMenuOption("all members")
    },
  )

  const menuSelectHandler = (e) => {
    let lowerStr =e.target.value.toLowerCase()
    
    setMenuOption(lowerStr)
    if(lowerStr==="add member")
      navigate(lowerStr)
    else
      navigate("")
  }

  return (
    <div style={{borderStyle:"solid", borderColor:"black", marginTop:"20px", width:"700px"}}>
      <h2>Subscriptions</h2>
      <MenuButton isSelect={menuOption==="all members"} value="All Members"  callback={menuSelectHandler}/>
      {storeData.permissionList.includes("Create Subscriptions") && <MenuButton isSelect={menuOption==="add member"} value="Add Member" callback={menuSelectHandler}/>}<br/>
      <Outlet/>
      </div>
  )
}
