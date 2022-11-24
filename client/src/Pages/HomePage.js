import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom"
import '../App.css';
import { MenuButton } from "../Components/MenuButton";
import { store } from "../Utils/appStore";
import { logoutAction } from "../Utils/userSlice";
export const HomePage = () => {
    const navigate=  useNavigate()
    const dispatch = useDispatch()
    const storeData = useSelector(state=>state)
    const [menuOption, setMenuOption] = useState("")
    const logoutHandler = () => {
        dispatch(logoutAction())
        navigate("/")
    
    }
    useEffect(
        ()=> {
            
            if(document.location.pathname.includes("movies"))
                setMenuOption("movies")
            else if(document.location.pathname.includes("editmember"))
                setMenuOption("subscriptions")
        }, [storeData.menuOption]
    )
    const menuSelectHandler = (e) => {
        let lowerStr =e.target.value.toLowerCase()
        setMenuOption(lowerStr)
        navigate(lowerStr)
    }
    return (
        <div style={{textAlign:"left"}}>
           {/*  <h3>Homepage</h3> */}
           <h2 style={{marginLeft:"5px", color:"orange"}}>{storeData.fullname}</h2>
           {storeData.permissionList.includes("View Movies") && <MenuButton isSelect={menuOption==="movies"} value="Movies" callback={menuSelectHandler}/>}
            
            {storeData.permissionList.includes("View Subscriptions") && <MenuButton isSelect={menuOption==="subscriptions"} value="Subscriptions" callback={menuSelectHandler}/>}
            {storeData.username==="admin" && <MenuButton isSelect={menuOption==="users"} 
                value="Users" callback={menuSelectHandler}/> }
            <input className="app-button" type="button" value="Log Out" onClick={logoutHandler}/>
            <br/>
            <Outlet/>
            <div>
                {/* <Outlet/> */}
            </div>
        </div>
    )
}