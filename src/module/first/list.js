import React from 'react'
import './index.css'

class List extends React.Component {
  constructor (props) {
    super(props)
    this.state =  {
      title: '',
      type: ''
    }
  }
  render() {
    return (<div>{this.state.title}</div>)
  }
  componentDidMount () {
    this.setState({
      title: this.props.location.state.name,
      type: this.props.location.state.type
    })
  }
}

export default List
