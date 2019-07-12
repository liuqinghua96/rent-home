import React from 'react'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import {Input, Grid, Icon, Item} from 'semantic-ui-react'
import http from '../../http'
import './index.css'

// 封装导航菜单组件
class Menus extends React.Component {
  render () {
    let menuData = this.props.data.map(item => {
      return (<Grid.Column key={item.id}>
          <div className='home-menu-item'>
            <Icon name='home' size='big' />
          </div>
          <div>{item.menu_name}</div>
        </Grid.Column>)
    })
    return (<div className="home-menu">
      <Grid columns={4} divided>
        <Grid.Row>
          {menuData}
        </Grid.Row>
      </Grid>
    </div>)
  }
}
// 封装资讯组件
class Info extends React.Component {
  render () {
    let info = this.props.data.map(item=>{
      return (<Item.Header key={item.id}>
        <span>限购 ●</span>
        <span>{item.info_title}</span>
      </Item.Header> );
      });
    return (<div className="home-msg">
      <Item.Group unstackable>
        <Item className='home-msg-img' >
          <Item.Image size='tiny' src={'http://47.96.21.88:8086/public/zixun.png'} />
          <Item.Content verticalAlign='top'>
            {info}
            <div className="home-msg-more">
              <Icon name='angle right' size='big' />
            </div>
          </Item.Content>
        </Item>
      </Item.Group>
    </div>)
  }
}

class First extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // 轮播图数据
      galleryList: [],
      menuList: [],
      info: []
    }
  }
  render () {
    return (<div className="home-container">
      <div className="home-topbar">
        {/* 搜索框 */}
        <Input fluid icon='search' placeholder='请输入关键字...'/>
      </div>
      <div className="home-content">
        {/* 轮播图 */}
        <ImageGallery 
          showThumbnails={false}
          showNav={false}
          autoPlay={true}
          showFullscreenButton={false}
          showPlayButton={false}
          items={this.state.galleryList} />
        {/* 菜单导航 */}
        <Menus data={this.state.menuList} />
        {/* 资讯展示 */}
        <Info data={this.state.info}/>
      </div>
    </div>)
  }
  // 动态获取数据信息并修改state中数据
  getData = async (path,stateItem) => {
    let {data} = await http.post(path)
    this.setState({
      [stateItem]: data.list
    })
  }
  componentDidMount () {
    // 动态获取轮播图数据
    this.getData('/homes/swipe', 'galleryList')
    this.getData('/homes/menu', 'menuList')
    this.getData('/homes/info', 'info')
  }
}

export default First
