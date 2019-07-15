import React from 'react'
import './index.css'
import {Tab} from 'semantic-ui-react'

// 资讯列表
class Msg extends React.Component {
  render() {
    return (<div>资讯列表</div>)
  }
}
// 头条列表
class Top extends React.Component {
  render() {
    return (<div>头条列表</div>)
  }
}
// 问答列表
class Faq extends React.Component {
  render() {
    return (<div>问答列表</div>)
  }
}

class Info extends React.Component {
  render () {
    const panes = [
      { menuItem: '资讯', render: () => <Tab.Pane><Msg/></Tab.Pane>},
      { menuItem: '头条', render: () => <Tab.Pane><Top/></Tab.Pane>},
      { menuItem: '问答', render: () => <Tab.Pane><Faq/></Tab.Pane>}
    ];
    return (<div className="find-container">
      <div className="find-topbar">资讯</div>
      <div className="find-content">
        <div>
          <Tab panes={panes}/>
        </div>
      </div>
    </div>)
  }
}

export default Info
