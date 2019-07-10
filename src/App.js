import React from 'react';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Login from './login'

/* function Login () {
  return (<div>
    <Button primary size="big">点击按钮</Button>
  </div>)
} */
function Home () {
  return (<div>首页</div>)
}

function App() {
  return (
    <BrowserRouter className="App">
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/home" component={Home}/>
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
