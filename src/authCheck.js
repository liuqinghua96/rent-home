// 路由权限过滤操作
import React from 'react'
import {Route, Redirect} from 'react-router-dom'

function AuthCheck (props) {
  let {path, component:Component} = props
  let isLogin = sessionStorage.getItem('mytoken')?true:false
  return (<Route path={path} render={()=>{
    return isLogin?<Component />:<Redirect to="/login"/>
  }} />)
}

export default AuthCheck