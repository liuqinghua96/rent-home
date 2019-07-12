
import React from 'react'
import './Main.css'
import {Grid, Icon} from 'semantic-ui-react'
import {Link, Route, Switch, Redirect} from 'react-router-dom'

function Index () {
  return (<div>index</div>)
}
function Info () {
  return (<div>info</div>)
}
function Chat () {
  return (<div>chat</div>)
}
function My () {
  return (<div>my</div>)
}

class MenuItem extends React.Component {
  render () {
    let {itemPath, itemIcon, itemName} = this.props
    return (
      <Grid.Column>
        <Route path={itemPath} children={(param)=>{
          let isActive = param.match?'active':''
          return (
            <Link to={itemPath} className={'menuDefault ' + isActive}>
              <Icon name={itemIcon}/>
              <div>{itemName}</div>
            </ Link>
          )
        }}></Route>
      </Grid.Column>
    )
  }
}

class Home extends React.Component {
  render () {
    return (<div className="main-container">
      {/* 内容区域 */}
      <div className="main-content">
        <Switch>
          <Route path="/home/index" component={Index} />
          <Route path='/home/info' component={Info}/>
          <Route path="/home/chat" component={Chat} />
          <Route path="/home/my" component={My} />
          <Redirect from='/home' to='/home/index'/>
        </Switch>
      </div>
      {/* 菜单区域 */}
      <Grid className="main-menu">
        <Grid.Row columns={4} textAlign="center" verticalAlign="middle">
          <MenuItem itemPath="/home/index" itemIcon="home" itemName="主页" />
          <MenuItem itemPath="/home/info" itemIcon="bullhorn" itemName="资讯" />
          <MenuItem itemPath="/home/chat" itemIcon="chat" itemName="微聊" />
          <MenuItem itemPath="/home/my" itemIcon="user" itemName="我的" />
        </Grid.Row>
      </Grid>
    </div>)
  }
}

export default Home