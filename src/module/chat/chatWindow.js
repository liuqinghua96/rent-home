import React from 'react'
import './chatWindow.css'
import {withRouter} from 'react-router-dom'

class ChatWindow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uname: '',
      fromUser: '',
      toUser: ''
    }
  }
  render () {
    return (<div>{this.state.uname}</div>)
  }
  componentDidMount () {
    let {uname,fromUser,toUser} = this.props.location.state
    this.setState({
      uname,
      fromUser,
      toUser
    })
  }
}

export default withRouter(ChatWindow)