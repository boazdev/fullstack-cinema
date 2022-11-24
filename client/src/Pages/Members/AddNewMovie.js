import React, { useEffect, useState } from 'react'
import { MenuButton } from '../../Components/MenuButton'
import { useSelector } from 'react-redux'
import { updateCinemaWS } from '../../Utils/cinemaWsCRUD'
export const AddNewMovie = (props) => {
    const storeData = useSelector(state=>state)
   /*  useEffect(()=>{
        let optionList=[]
        Object.entries(storeData.editList).forEach(
        ([key, value]) =>  
        {if(value) 
            optionList.push(key)}t(0,key) 
    )
    },[]
    
     */
    const dateFormat = (date) => {
        let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${year}-${month}-${day}`;
return currentDate
    }
    
    const [dateWatch, setDateWatch] = useState(dateFormat(new Date()))
    const [movieId,setMovieId] = useState(storeData.moviesData[0]._id)
  return (
    <div style={{width:"290px", height:"140px",borderColor:"red", borderStyle:"solid",marginTop:"20px", marginBottom:
    "20px"}}>
        <h3>Add a new movie</h3>
        <select onChange={(e)=>setMovieId(e.target.value)}>
            
            {/* {storeData.moviesData.map(item=><option key={item._id} value={item._id}>{item.name}</option>)} */}
            {storeData.moviesData.filter(item0=>props.watchList.findIndex(item1=>item1.movieId===item0._id)===-1).map(item=><option key={item._id} value={item._id}>{item.name}</option>)}
        </select>
        <input type="date" defaultValue={dateFormat(new Date())} onChange={(e)=>setDateWatch(e.target.value)}/><br/>
        <MenuButton value="Subscribe" isSelect={false} callback={()=>props.callback({movieId:movieId,date:dateWatch})}/>
    </div>
  )
}
