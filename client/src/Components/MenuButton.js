import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
export const MenuButton = (props) => {
  return (
    <>
    <input className={props.isSelect?"app-select-button":"app-button"} type="button"
     value={props.value} onClick={props.callback}/>
    </>
  )
}
