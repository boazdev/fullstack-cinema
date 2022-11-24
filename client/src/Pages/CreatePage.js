import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createCinemaWs } from "../Utils/loginUtils"
export const CreatePage = () => {
    const navigate= useNavigate()
    const [username,setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginError,setLoginError] = useState(false)
    const [errorColor,setErrorColor] = useState(false)

    const buttonClickHandler = async () => {
        let loginObj = {username:username, password:password}
          let resp = await createCinemaWs(loginObj)  
          //console.log(resp)
          if(resp.status==401)
          {
            setLoginError(resp.data.error)
            setErrorColor(!errorColor)
          }
          else if(resp.status==200)
          {
            //decode token and add user data to redux store
            navigate("/")
          }
        }

    return (
        <div>
        <h3>Create an Account</h3>
            <span>User name : </span>
            <input type="text" onChange={(e)=>setUsername(e.target.value)}/><br/>
            <span>Password : </span>
            <input type="text" onChange={(e)=>setPassword(e.target.value)}/><br/>
            <input type="button" value="Create" onClick = {buttonClickHandler}/>
            {loginError&& <span style={{marginLeft:"5px", color:errorColor?"red":"orange"}}>{loginError}</span>}
            <br/>
            </div>
    )
}