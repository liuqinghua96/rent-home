import React from 'react'
import './chatWindow.css'
import {withRouter} from 'react-router-dom'
import {Form, Icon, Button, TextArea} from 'semantic-ui-react'
import http from '../../http'

class ChatWindow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uname: '',
      fromUser: '',
      toUser: '',
      list: []
    }
  }
  goBack = () => {
    this.props.history.goBack()
  }
  render() {
    let listInfo = this.state.list.map(item=>{
      return (
        <li key={item.id}>
          <img src={'http://47.96.21.88:8086/' + item.avatar} alt=""/>
          <span>{item.chat_msg}</span>
        </li>
      );
    })
    return (
      <div className="chat-window">
        <div className="chat-window-title">
           <Icon onClick={this.goBack} name='angle left' className='chat-ret-btn' size='large'/>
           <span>{this.state.uname}</span>
        </div>
        <div className="chat-window-content">
          <ul>
            {listInfo}
          </ul>
        </div>
        <div className="chat-window-input">
          <Form>
            <TextArea placeholder='请输入内容...' />
            <Button >关闭</Button>
            <Button primary >发送</Button>
          </Form>
        </div>
      </div>
    );
  }
  async componentDidMount () {
    let {uname,fromUser,toUser} = this.props.location.state
    let {data: {list}} = await http.post('chats/info',{
      from_user:fromUser,
      to_user: toUser
    })
    this.setState({
      uname,
      fromUser,
      toUser,
      list
    })
  }
}

export default withRouter(ChatWindow)