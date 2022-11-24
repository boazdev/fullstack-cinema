import React, { useEffect } from 'react'

import { useParams ,useNavigate } from 'react-router-dom'
export const ErrorPage = () => {
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
      const timer = setTimeout(() => {
        navigate("/")
        //console.log('This will run after 1 second!')
      }, 3500);
      return () => clearTimeout(timer);
    }, []);
  return (
    <div>
     
      
      <h3>Error: {params.errorstr} </h3>
      </div>
  )
}
