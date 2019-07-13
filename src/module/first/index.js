import React from 'react'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import {withRouter} from 'react-router-dom'
import {Input, Grid, Icon, Item, Button, Dimmer, Loader} from 'semantic-ui-react'
import http from '../../http'
import './index.css'

// 封装导航菜单组件
class Menus extends React.Component {
  render() {
    let menuData = this.props.data.map(item => {
      return (<Grid.Column onClick={this.props.jump.bind(this,item.menu_name,item.id)} key={item.id}>
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

// 封装问答组件
class Faq extends React.Component {
  render () {
    let faq = this.props.data.map(item=>{
      let tags = item.question_tag.split(',').map((tag, index)=>{
        return <Button key={index} basic color='green' size='mini'>{tag}</Button>;
      });
      return (
        <li key={item.question_id}>
          <div>
            <Icon name='question circle outline' />
            <span>{item.question_name}</span>
          </div>
          <div>
            {tags}
            <div>{item.atime} ● <Icon name='comment alternate outline' /> {item.qnum}</div>
          </div>
        </li>
      );
    });
    return (<div className="home-ask">
      <div className="home-ask-title">好客问答</div>
      <ul>
        {faq}
      </ul>
    </div>)
  }
}

class House extends React.Component {
  render () {
    let titles = ['最新开盘','二手精选','租一个家']
    let houseList = titles.map((item,index) => {
      let content = this.props.data.filter(item=>{
        return item.home_type === index + 1
      })
      let contentDataList = content.map(item=>{
        let tags = item.home_tags.split(',').map((tag,i) => {
          return <Button key={i} basic color='green' size='mini'>{tag}</Button>
        })
        return (<Item key={item.id}>
          <Item.Image src={'http://47.96.21.88:8086/public/home.png'}/>
          <Item.Content>
            <Item.Header>{item.home_name}</Item.Header>
            <Item.Meta>
              <span className='cinema'>{item.home_desc}</span>
            </Item.Meta>
            <Item.Description>
              {tags}
            </Item.Description>
            <Item.Description>{item.home_price}</Item.Description>
          </Item.Content>
        </Item>)
      })
      return (<div key={index}>
        <div className='home-hire-title'>{item}</div>
        <Item.Group divided unstackable>
          {/*房源列表*/}
          {contentDataList}
        </Item.Group>
      </div>)
    })
    return (
      <div>
        {/* 房源信息 */}
        {houseList}
      </div>
    )
  }
}

class First extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // 轮播图数据
      galleryList: [],
      menuList: [],
      info: [],
      faq: [],
      house: [],
      count: 0,
      isLoading: true
    }
  }
  jumpToList = (name,id) => {
    let {history} = this.props
    if(name==='二手房'||name==='新房'||name==='租房'||name==='海外') {
      history.push('/home/list',{name:name,type:id})
    } else if (name === '计算器') {
      history.push('/home/calc')
    }
  }
  render () {
    return (<div className="home-container">
      <div className="home-topbar">
        {/* 搜索框 */}
        <Input fluid icon='search' placeholder='请输入关键字...'/>
      </div>
      <div className="home-content">
        {/* 加载数据时的遮罩效果 */}
        <Dimmer inverted active={this.state.isLoading}>
          <Loader>加载中...</Loader>
        </Dimmer>
        {/* 轮播图 */}
        <ImageGallery 
          showThumbnails={false}
          showNav={false}
          autoPlay={true}
          showFullscreenButton={false}
          showPlayButton={false}
          items={this.state.galleryList} />
        {/* 菜单导航 */}
        <Menus data={this.state.menuList} jump={this.jumpToList} />
        {/* 资讯展示 */}
        <Info data={this.state.info}/>
        {/* 频繁问答 */}
        <Faq data={this.state.faq} />
        {/* 房源列表 */}
        <House data={this.state.house} />
      </div>
    </div>)
  }
  // 动态获取数据信息并修改state中数据
  getData = async (path,stateItem) => {
    let {data} = await http.post(path)
    this.setState({
      [stateItem]: data.list,
      // count用来记录成功返回数据的条数
      count: this.state.count+1,
      // isLoading用来控制遮罩层的显示与隐藏：当count为4时的下一次正好5条数据全部接收成功
      isLoading: this.state.count===4?false:true
    })
  }
  componentDidMount () {
    // 动态获取轮播图数据
    this.getData('/homes/swipe', 'galleryList')
    // 获取菜单列表动态数据
    this.getData('/homes/menu', 'menuList')
    // 获取信息资讯数据
    this.getData('/homes/info', 'info')
    // 获取问答数据
    this.getData('/homes/faq', 'faq')
    // 获取房源列表数据
    this.getData('/homes/house', 'house')
  }
}

export default withRouter(First)
