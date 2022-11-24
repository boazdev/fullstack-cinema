import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { UserForm } from '../../Components/UserForm'

export const UserAddPage = (props) => {
  const navigate= useNavigate()
  const storeData = useSelector(state=>state)

  return (
    <div >
        <h3>Add New User</h3>
        <UserForm isEdit={false} data={false}/>
        
    </div>
  )
}
