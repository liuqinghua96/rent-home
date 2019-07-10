
// 登录组件

import React from 'react'
import './Login.css'
import {Icon, Form, Divider} from 'semantic-ui-react'

class Login extends React.Component {
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
              name='username'
              placeholder='请输入用户名...' 
            />
            <Form.Input
              icon='lock' 
              required 
              size='big' 
              iconPosition='left' 
              name='password'
              placeholder='请输入密码...' 
            />
            <Form.Button fluid>登录</Form.Button>
          </Form>
        </div>
        <Divider horizontal>---</Divider>
        {/* 第三方登录区域 */}
        <div className="login-third">
          <Icon size='big' name='qq'/>
          <Icon size='big' name='wechat'/>
        </div>
      </div>
    )
  }
}

export default Login