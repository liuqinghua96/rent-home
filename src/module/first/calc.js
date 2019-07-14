import React from 'react'
import {withRouter} from 'react-router-dom'
import {Icon, Tab, Grid, Dropdown, Input, Button} from 'semantic-ui-react'
import ReactEcharts from 'echarts-for-react';

// 公积金贷款组件
class Loan extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      type: 1,
      total: 0,
      year: 1,
      rate: 1
    }
  }
  // 修改贷款方式
  // obj为当前的DropDown组件的实例对象
  handleType = (e,obj) => {
    this.setState({
      type: obj.value
    })
  }
  // 修改贷款总额
  handleTotal = (e) => {
    this.setState({
      total: e.target.value
    });
  }
  // 修改贷款年限
  handleYear = (e, obj) => {
    this.setState({
      year: obj.value
    });
  }
  // 修改贷款利率
  handleRate = (e, obj) => {
    // 处理下拉选项的数据绑定
    this.setState({
      rate: obj.value
    });
  }
  handleCalc = () => {
    console.log(this.state.total)
    console.log(this.state.type)
    console.log(this.state.year)
    console.log(this.state.rate)
  }
  render () {
    // 贷款方式
    const options = [
      { key: '1', text: '按房间总额', value: 1 },
      { key: '2', text: '按贷款总额', value: 2 }
    ]
    // 贷款年限
    let generateYears = (n) => {
      let years = [];
      for(let i=1;i<=n;i++) {
        let year = {
          key: i,
          text: i,
          value: i
        };
        years.push(year);
      }
      return years;
    }
    // 贷款利率
    let rates = [
      {key: 1,text: '基准利率(3.25%)',value: 1},
      {key: 2,text: '基准利率9.5折',value: 2},
      {key: 3,text: '基准利率9折',value: 3},
      {key: 4,text: '基准利率8.5折',value: 4}
    ];
    return (<Grid column={2}>
      <Grid.Row>
        <Grid.Column width={6}>
          贷款方式
        </Grid.Column>
        <Grid.Column width={10}>
          <Dropdown value={this.state.type} onChange={this.handleType} selection options={options}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={6}>
          贷款总额
        </Grid.Column>
        <Grid.Column width={10}>
          <Input value={this.state.total} onChange={this.handleTotal} placeholder='贷款总额...'/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={6}>
          贷款年限
        </Grid.Column>
        <Grid.Column width={10}>
          <Dropdown value={this.state.year} onChange={this.handleYear} selection options={generateYears(25)}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={6}>
          贷款利率
        </Grid.Column>
        <Grid.Column width={10}>
          <Dropdown value={this.state.rate} onChange={this.handleRate} selection options={rates}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Button onClick={this.handleCalc} fluid primary>计算</Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          {/* <ReactEcharts ref={(e) => { this.reactEchart = e;}} option={this.getOption()}/> */}
        </Grid.Column>
      </Grid.Row>
    </Grid>)
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