import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { MenuButton } from '../Components/MenuButton'
import { setMoviesFilter } from '../Utils/userSlice'

export const MoviesPage = () => {
  const navigate = useNavigate()
  const storeData= useSelector(state=>state)
  const dispatch=useDispatch()
  const [menuOption,setMenuOption] = useState("all movies")
  const [searchValue, setSearchValue] = useState("")
  useEffect(
    ()=>{
      
      if(document.location.pathname==="/homepage/movies")
        setMenuOption("all movies")
    },[]
  )
  const printFunc = () =>{
    console.log("MoviesPage - Outlet Context")
  }
  const menuSelectHandler = (e) => {
    let lowerStr =e.target.value.toLowerCase()
    dispatch(setMoviesFilter(""))
    setMenuOption(lowerStr)
    if(lowerStr==="add movie")
      navigate(lowerStr)
    else
      navigate("")
  }
  return (
    <div style={{borderStyle:"solid", borderColor:"black", marginTop:"20px", width:"700px"}}>
      <h2>Movies</h2>
      <MenuButton isSelect={menuOption==="all movies"} value="All Movies"  callback={menuSelectHandler}/>
      {storeData.permissionList.includes("Create Movies") && <MenuButton isSelect={menuOption==="add movie"} value="Add Movie" callback={menuSelectHandler}/>}
      {menuOption==="all movies" &&
      <>
      <label style={{fontSize:"19px"}}>Find Movie : </label>
      <input type="text" defaultValue={storeData.moviesFilter} style={{ marginRight:"10px"}} onChange={(e)=>setSearchValue(e.target.value)}/>
      <MenuButton isSelect={false} value="Find"  callback={()=>dispatch(setMoviesFilter(searchValue))}/></>
      }
      
      <br/>
      <Outlet context={[menuOption,printFunc,setMenuOption]}/>
      </div>
  )
}
