import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCinemaWS } from '../../Utils/cinemaWsCRUD'
import { UserItem } from './UserItem'

export const UserViewPage = () => {
    const storeData = useSelector(state=>state)
    const [usersList,setUsersList] = useState([])
    useEffect(
        () => {
            
            const fetchIt = async () => {

                const resp = await getCinemaWS("users",storeData.token)
                setUsersList(resp.data)
            };
            fetchIt()
        },[]
    )
  return (
    <div style={{marginTop:"10px", width:"350px"}}>
    {usersList.map(item=><UserItem key={item.id} data={item}/>)}
    </div>
  )
}
