import React from 'react'
import './index.css'
import http from '../../http'
import {withRouter} from 'react-router-dom'
import {Icon, Item} from 'semantic-ui-react'

class List extends React.Component {
  constructor (props) {
    super(props)
    this.state =  {
      title: '',
      type: '',
      list: []
    }
  }
  goBack= () => {
    this.props.history.goBack()
  }
  render() {
    return (<div className="house-list">
      <div className="house-list-title">
        <Icon onClick={this.goBack} name='angle left' size='large'/>
        {this.state.title}
      </div>
      <div className="house-list-content">
        {/*房源列表*/}
        <Item.Group divided unstackable>
          12313243
        </Item.Group>
      </div>
    </div>)
  }
  componentDidMount () {
    this.setState({
      title: this.props.location.state.name,
      type: this.props.location.state.type
    },()=>{
      let {data} = http.post('/homes/list',{home_type: this.state.type})
      this.setState({
        list: data
      })
    })
  }
}

export default withRouter(List)
