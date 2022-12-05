import React, { useState } from 'react'
import { updateCinemaWS,postCinemaWS } from '../Utils/cinemaWsCRUD'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { dateFormat, genresList } from '../Utils/generalUtils'
import Select from "react-select";
export const MovieForm = (props) => {
  const navigate= useNavigate()
  const storeData = useSelector(state=>state)
  const [movieObj,setMovieObj] =useState({name:props.isEdit?props.data.name:"",genres:props.isEdit?props.data.genres:[]
            ,image:props.isEdit?props.data.image:"",premiered:props.isEdit?props.data.premiered:dateFormat(new Date())})
            
  
            //const [menuOption,printFunc,setMenuOption]= useOutletContext()
  const cancelHandler = () =>
  {
    if(!props.isEdit)
        props.setMenuOption("all movies")
    navigate("/homepage/movies")
  }
  const submitHandler = async (e) => {
              e.preventDefault()
              
            /* console.log("sending object:")
            console.log(movieObj) */
              let resp = props.isEdit? await updateCinemaWS("movies",props.data._id,movieObj,storeData.token) :await postCinemaWS("movies",movieObj,storeData.token)
              if (resp.status==401)
                {
                  navigate("/error/"+ resp.data.error)
                  return
                }
             // console.log("response post:" +resp.toString())
            // printFunc()
             if(!props.isEdit)
                props.setMenuOption("all movies")
              navigate("/homepage/movies")
            }
            const selectHandler = (data) => {
                setMovieObj({...movieObj,genres:data.map(item=>item.value) })
            }
  return (
    <>
    <form>
           {props.data!=undefined &&
           <>
           <label>Name : </label><input type="text" defaultValue={props.isEdit ? props.data.name:""} onChange={(e) => setMovieObj({...movieObj, name:e.target.value})}/><br/>
            {/* <label>Genres : </label><input type="text" defaultValue={props.isEdit ? props.data.genres.toString():""} onChange={(e) => setMovieObj({...movieObj, genres:e.target.value})}/><br/> */}
            <div style={{display:"inline-block"}}>
            <label>Genres : </label> 
            <Select defaultValue={movieObj.genres.map(item=>{return{value:item, label:item}})} options={genresList.map(item=>{return{value:item, label:item}})} placeholder="Select genres"
              onChange={selectHandler}  isMulti  styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  width:"300px", 
                }),
              }}/> </div><br/>
           {/*  {console.log(genresList)} */}
            <label>image url : </label><input type="text" defaultValue={props.isEdit ? props.data.image:""} onChange={(e) => setMovieObj({...movieObj, image:e.target.value})}/><br/>
            <label>Premiered : </label>{/* <input type="text" defaultValue={props.isEdit ? props.data.premiered:""} onChange={(e) => setMovieObj({...movieObj, premiered:e.target.value})}/><br/> */}
            <input type="date" defaultValue={props.isEdit ?props.data.premiered:dateFormat(new Date())} onChange={(e) => setMovieObj({...movieObj, premiered:e.target.value})}/><br/>
            <br/>
            <input type="submit" className='app-button' value={props.isEdit ? "Update":"Save"} onClick={submitHandler}/>
            <input type="button" className='app-button' value="Cancel" onClick={cancelHandler}/>
           </>}
            
            
        </form>
    </>
  )
}
