import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { getCinemaWS } from '../../Utils/cinemaWsCRUD'
import { setMoviesFilter } from '../../Utils/userSlice'
import { MovieItem } from './MovieItem'

export const MovieViewPage = () => {

    const storeData = useSelector(state=>state)
    const [moviesList, setMoviesList] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [menuOption,printFunc]= useOutletContext()
    useEffect(
        () => {
            
            const fetchIt = async () => {

                let resp = await getCinemaWS("movies/?sub_join=true",storeData.token)
                if (resp.status==401)
                  {
                    navigate("/error/"+ resp.data.error)
                    return
                  }
                    /* console.log(resp.data) */
                //console.log(resp)
                
                if(storeData.moviesFilter=="")
                  setMoviesList(resp.data)
                else
                  setMoviesList(resp.data.filter(item=>item.name.toLowerCase().includes(storeData.moviesFilter.toLowerCase())))
                //console.log(tempMembersList)
                
                //dispatch(setEditData(tempMoviesList))
                //console.log("movie view all page render")
            };
            
            //console.log("context:" + menuOption)
            //printFunc()
            fetchIt()
        },[storeData.moviesFilter])
  return (
    <div style={{marginTop:"10px", width:"450px"}}>
    {moviesList.map(item=><MovieItem key={item._id} data={item}/>)}
    </div>
  )
}
