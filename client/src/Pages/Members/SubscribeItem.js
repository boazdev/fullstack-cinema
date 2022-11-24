import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'
import { MenuButton } from '../../Components/MenuButton'
import { updateCinemaWS } from '../../Utils/cinemaWsCRUD'
import { setEditData, setMemberRefresh, setMenuOption, setMoviesData, setMoviesFilter } from '../../Utils/userSlice'
import { AddNewMovie } from './AddNewMovie'

export const SubscribeItem = (props) => {
  const storeData = useSelector(state=>state)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [subscribeClicked, setSubscribedClicked] = useState(false)
  const subscribeHandler = async (obj) => { //obj={movieId:id, date:2022-11-20...}
      /* console.log("sending obj update subscribers:")
      console.log(obj) */
     
    await updateCinemaWS("subscriptions",props.id, obj, storeData.token)
    setSubscribedClicked(false)
    dispatch(setMemberRefresh({...storeData.memberRefresh}))
    //navigate("/homepage/subscriptions")
    //window.location.reload(false);
  }
  
  const linkMoviesHandlers = (itemName) =>
  {
    
    console.log(itemName)
    dispatch(setMoviesFilter(itemName))
   dispatch(setMenuOption({...storeData.menuOption,menuOption:"movies"}))
    
  }
  
  return (
    <div style={{marginTop:"10px", marginBottom:"10px", borderStyle:"solid", borderColor:"black", width:"300px"}}>
        <span style={{fontSize:"18px"}}><b>Movies Watched</b></span><br/>
        <MenuButton value="Subscribe to new movie" isSelect={false} callback={()=>setSubscribedClicked(!subscribeClicked)}/>
        {subscribeClicked && <AddNewMovie callback={subscribeHandler} watchList={props.watchList}/>}
        <ul>
            {props.watchList.map(item=><li key={item.movieId}><Link onClick={()=>linkMoviesHandlers(item.name)/* ()=>dispatch(setMoviesFilter(item.name)) */} 
            to={"/homepage/movies"}>{item.name}</Link>{ ", " +item.date}</li>)}
        </ul>
    </div>
  )
}
