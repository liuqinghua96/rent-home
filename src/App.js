import React from 'react';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import AuthCheck from './authCheck'
import Login from './login'

/* function Login () {
  return (<div>登录</div>)
} */
function Home () {
  return (<div>首页</div>)
}

function App() {
  return (
    <BrowserRouter className="App">
      <Switch>
        <Route path="/login" component={Login}/>
        <AuthCheck path="/home" component={Home}/>
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
