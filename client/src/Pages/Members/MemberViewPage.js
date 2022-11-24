import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCinemaWS } from '../../Utils/cinemaWsCRUD'
import { setEditData, setMoviesData } from '../../Utils/userSlice'
import { MemberItem } from './MemberItem'

/* import { UserItem } from './UserItem' */

export const MemberViewPage = () => { //todo: update server to fetch the subscription data with movies list and their names

    const storeData = useSelector(state=>state)
    const [membersList,setMembersList] = useState([])
    const [moviesList, setMoviesList] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(
        () => {
            
            const fetchIt = async () => {

                let resp = await getCinemaWS("members/?sub_join=true",storeData.token)
                if (resp.status==401)
                  {
                    navigate("/error/"+ resp.data.error)
                    return
                  }
                    
                //console.log(resp)
                let tempMembersList = resp.data
                resp = await getCinemaWS("movies",storeData.token)
                let tempMoviesList =resp.data
                let namesDict={}
                tempMoviesList.forEach(item => {
                  namesDict[item._id]=item.name
                });
                tempMembersList = tempMembersList.map(item=>{return{...item, movies:
                   item.movies.map(item2=>{return{...item2,name:namesDict[item2["movieId"]]}})}})
                //console.log(tempMembersList)
                setMembersList(tempMembersList)
                dispatch(setMoviesData(tempMoviesList))
                
            };
            fetchIt()
        },[storeData.memberRefresh])
  return (
    <div style={{marginTop:"10px", width:"350px"}}>
    {membersList.map(item=><MemberItem key={item._id} data={item}/>)}
    </div>
  )
}
