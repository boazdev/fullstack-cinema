import {  createSlice } from "@reduxjs/toolkit"
/* import { current } from "@reduxjs/toolkit" */


const userSlice = createSlice({ 
name:"user",
initialState: {username:"", permissionList:[], fullname:"", token:"", editData:{},
 moviesData:[], moviesFilter:"",menuOption:"", memberRefresh:{dummy:"dummy"}}
,
reducers:{
    loginAction :(state,action) =>
    {
        /* if(state.productList.length==0)
            state.productList = action.payload */
        state.username = action.payload.username
        state.permissionList = action.payload.permissionList
        state.fullname = action.payload.fullname
        state.token = action.payload.token
    },
    logoutAction : (state,action) =>
    {
        state.username = ""
        state.permissionList = []
        state.fullname = ""
        state.token = ""
    }
    ,
    setEditData : (state,action) => {
            state.editData = action.payload
    }
    ,
    setMoviesData : (state,action) => {
        state.moviesData = action.payload
    }
    ,
    setMoviesFilter : (state,action) =>{
        state.moviesFilter = action.payload
    },
    setMenuOption : (state,action) =>{
        state.menuOption = action.payload
    },
    setMemberRefresh : (state,action) =>{
        state.memberRefresh = action.payload
    },
}
})

const {actions, reducer} = userSlice
export const {loginAction,logoutAction, setEditData, setMoviesData, setMoviesFilter, setMenuOption,setMemberRefresh} = actions
export default reducer