import React from 'react'
import { MemberForm } from '../../Components/MemberForm'

export const MemberAddPage = () => {
  return (
    <div style={{width:"320px", height:"450px",borderColor:"black", borderStyle:"solid",marginTop:"20px", marginBottom:
      "50px"}}>
        <h3>Add new Member</h3>
        <MemberForm isEdit={false} data={false}/>
        
    </div>
  )
}
