
// 登录组件

import React from 'react'
import './Login.css'
import { withRouter } from 'react-router-dom';
import {Icon, Form, Divider} from 'semantic-ui-react'
import http from './http';

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  handleUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  handlePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }
  handelLogin = async() => {
    let res = await http.post('users/login', {uname: this.state.username,pwd: this.state.password})
    if(res.meta.status === 200) {
      // 保存token到本地缓存中
      sessionStorage.setItem('mytoken', res.data.token);
      sessionStorage.setItem('uid', res.data.uid);
      // 跳转到主页面
      let { history } = this.props;
      history.push('/home');
    }
  }
  render () {
    return (
      <div className="login-container">
        {/* logo区域 */}
        <div className="login-logo">
          <Icon name="home" size="massive" />
        </div>
        {/* 表单区域 */}
        <div className="login-form">
          <Form>
            <Form.Input
              icon='user' 
              required 
              size='big' 
              iconPosition='left' 
              value={this.state.username}
              name='username'
              onChange={this.handleUsername}
              placeholder='请输入用户名...' 
            />
            <Form.Input
              icon='lock' 
              required 
              size='big' 
              iconPosition='left' 
              name='password'
              value={this.state.password}
              onChange={this.handlePassword}
              placeholder='请输入密码...' 
            />
            <Form.Button fluid onClick={this.handelLogin}>登录</Form.Button>
          </Form>
        </div>
        <Divider horizontal><Icon name="paperclip"/></Divider>
        {/* 第三方登录区域 */}
        <div className="login-third">
          <Icon size='big' name='qq'/>
          <Icon size='big' name='wechat'/>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)