import React from 'react'
import {withRouter} from 'react-router-dom'
import {Icon,Tab} from 'semantic-ui-react'

// 公积金贷款组件
class Loan extends React.Component {
  render () {
    return (<div>公积金贷款组件</div>)
  }
}


class Calc extends React.Component {
  goBack= () => {
    this.props.history.goBack()
  }
  render () {
    let PanesData = [
      {menuItem:'公积金贷款', render: () => <Tab.Pane><Loan/></Tab.Pane>},
      {menuItem:'商业贷款', render: () => <Tab.Pane>商业贷款</Tab.Pane>},
      {menuItem:'组合贷款', render: () => <Tab.Pane>组合贷款</Tab.Pane>}
    ];
    return (<div className="home-calc">
      <div className="home-calc-title">
        <Icon onClick={this.goBack} name = 'angle left' size = 'large'/>贷款利率计算 
      </div>
      <div className="map-calc-content">
        {/*选项卡布局*/}
        <Tab  panes={PanesData}/>
      </div>
    </div>)
  }
}

export default withRouter(Calc)