import React from 'react'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import {Input} from 'semantic-ui-react'
import './index.css'

class First extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      calleryList: [{
        original: 'http://47.96.21.88:8086/public/1.png'
      }, {
        original: 'http://47.96.21.88:8086/public/2.png'
      }, {
        original: 'http://47.96.21.88:8086/public/3.png'
      }]
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
          items={this.state.calleryList} />
      </div>
    </div>)
  }
}

export default First
