import { useState } from "react"
import { useNavigate,Link } from "react-router-dom"
import { loginCinemaWs, parseJwt } from "../Utils/loginUtils"
import { useDispatch } from "react-redux"
import { loginAction } from "../Utils/userSlice"
export const Login = () => {
    const navigate= useNavigate()
    const [username,setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginError,setLoginError] = useState(false)
    const [errorColor,setErrorColor] = useState(false)
    const dispatch = useDispatch()
    const buttonClickHandler = async () => {
        let loginObj = {username:username, password:password}
          let resp = await loginCinemaWs(loginObj)  
          
          if(resp.status==401)
          {
            setLoginError(resp.data.error)
            setErrorColor(!errorColor)
          }
          else if(resp.status==200)
          {
            //decode token and add user data to redux store
            //
            //console.log(resp.data)
            let data = parseJwt(resp.data.token)
            console.log(data)
            let loginObj = {username: data.username, permissionList: data.permissions,
                 fullname:data.userData.firstname+" " + data.userData.lastname, token:resp.data.token}
            dispatch(loginAction(loginObj))
            navigate("/homepage")
          }
          
        
    }
    return (
        <div style={{textAlign:"left", marginLeft:"10px"}}>
            
            <h3>Log in Page</h3>
            <span>User name : </span>
            <input type="text" onChange={(e)=>setUsername(e.target.value)}/><br/>
            <span>Password : </span>
            <input type="text" onChange={(e)=>setPassword(e.target.value)} /><br/>
            <input type="button" value="Login" onClick = {buttonClickHandler}/* {()=>navigate("/homepage")} *//>
            {loginError&& <span style={{marginLeft:"5px", color:errorColor?"red":"orange"}}>{loginError}</span>}
            <br/>
            
            <span>New User ? : </span> <span><Link to={"/create"}>Create Account</Link></span>
        </div>
    )
}