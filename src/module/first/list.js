import React from 'react'
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
    let listInfo = this.state.list.map(item=>{
      return (
        <Item key={item.id}>
          <Item.Image src={'http://47.96.21.88:8086/public/home.png'}/>
          <Item.Content>
            <Item.Header>{item.home_name}</Item.Header>
            <Item.Meta>
              <span className='cinema'>{item.home_desc}</span>
            </Item.Meta>
            <Item.Description>
              {item.home_tags}
            </Item.Description>
            <Item.Description>{item.home_price}</Item.Description>
          </Item.Content>
        </Item>
      );
    });
    return (<div className="house-list">
      <div className="house-list-title">
        <Icon onClick={this.goBack} name='angle left' size='large'/>
        {this.state.title}
      </div>
      <div className="house-list-content">
        {/*房源列表*/}
        <Item.Group divided unstackable>
          {listInfo}
        </Item.Group>
      </div>
    </div>)
  }
  componentDidMount () {
    this.setState({
      title: this.props.location.state.name,
      type: this.props.location.state.type
    },async ()=>{
      let {data} = await http.post('/homes/list',{home_type: this.state.type})
      this.setState({
        list: data
      })
    })
  }
}

export default withRouter(List)
