import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
import { setMenuOption } from '../../Utils/userSlice'
export const SubscriberItem = (props) => {
  const storeData = useSelector(state=>state)
  const dispatch = useDispatch()
  return (
    <div style={{ marginLeft:"10px",verticalAlign:"top", borderStyle:"solid", borderColor:"black", width:"300px", display:"inline-block"}}>
      <h3>Subscriptions watched</h3>
      <ul>
        {props.data.map(item=><li key={item.memberId}>
          <Link onClick={()=>dispatch(setMenuOption({...storeData.menuOption,menuOption:"subscriptions"}))} 
          to={"/homepage/editmember/"+item.memberId}>{item.name} </Link>{" , "}{item.date}
          </li>)}
      </ul>
      
      </div>
  )
}
