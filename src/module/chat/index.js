import React from 'react'
import './index.css'
import http from '../../http'
import {withRouter} from 'react-router-dom'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  toChat = (uname,fromUser,toUser) => {
    this.props.history.push('/home/cwin',{
      uname,
      fromUser,
      toUser
    })
  }
  render () {
    let chatList = this.state.list.map(item => {
      return (<li onClick={this.toChat.bind(this, item.username, item.from_user, item.to_user)} key={item.id}>
        <div className="avarter">
          <img src={'http://47.96.21.88:8086/' + item.avatar} alt="avarter"/>
          <span className="name">{item.username}</span>
          <span className="info">{item.chat_msg}</span>
          <span className="time">{item.ctime}</span>
        </div>
      </li>)
    })
    return (<div className="chat-container">  
      <div className="chat-title">微聊</div>
      <div className="chat-list">
        <ul>
          {chatList}
        </ul>
      </div>
    </div>)
  }
  async componentDidMount () {
    let {data:{list}} = await http.post('chats/list')
    this.setState({
      list
    })
  }
}

export default withRouter(Chat)
