import React from 'react'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import {Input} from 'semantic-ui-react'
import http from '../../http'
import './index.css'

class First extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // 轮播图数据
      galleryList: []
    }
  }
  render () {
    return (<div className="home-container">
      <div className="home-topbar">
        <Input fluid icon='search' placeholder='请输入关键字...'/>
      </div>
      <div className="home-content">
        <ImageGallery 
          showThumbnails={false}
          showNav={false}
          autoPlay={true}
          showFullscreenButton={false}
          showPlayButton={false}
          items={this.state.galleryList} />
      </div>
    </div>)
  }
  getGalleryData = async () => {
    let {data} = await http.post('homes/swipe')
    this.setState({
      galleryList: data.list
    })
  }
  componentDidMount () {
    // 动态获取轮播图数据
    this.getGalleryData()
  }
}

export default First
