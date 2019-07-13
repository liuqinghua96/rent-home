
import React from 'react'
import './Main.css'
import {Grid, Icon} from 'semantic-ui-react'
import {Link, Route, Switch, Redirect} from 'react-router-dom'

import First from './first/index'
import List from './first/list'
import Info from './info/index'
import Chat from './chat/index'
import My from './my/index'

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
          <Route path="/home/index" component={First} />
          <Route path='/home/info' component={Info}/>
          <Route path="/home/chat" component={Chat} />
          <Route path="/home/my" component={My} />
          <Route path="/home/list" component={List} />
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