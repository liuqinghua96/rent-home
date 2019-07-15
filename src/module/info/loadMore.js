import React from 'react'
import './loadMore.css'
import Tloader from 'react-touch-loader';
import {Icon, Item, Button} from 'semantic-ui-react'
import http from '../../http'
import { thisExpression } from '@babel/types';

class CommonList extends React.Component {
  render() {
    let { type, list } = this.props;
    // 资讯列表和头条列表模板类似 type == 1 || type == 2
    let listTpl = null;
    if(type === 1 || type === 2) {
      // 资讯列表或者头条列表模板
      let listInfo = list.map(item=>{
        return (
          <Item key={item.id}>
            <Item.Image size='small' src='http://47.96.21.88:8086/public/1.png' />
            <Item.Content verticalAlign='middle'>
              <Item.Header className='info-title'>{item.info_title}</Item.Header>
              <Item.Meta>
                <span className='price'>$1200</span>
                <span className='stay'>1 Month</span>
              </Item.Meta>
            </Item.Content>
          </Item>
        );
      }); 
      listTpl = (
        <Item.Group unstackable>
          {listInfo}
        </Item.Group>
      );
    } else if(type === 3) {
      // 问答列表
      let faqInfo = list.map(item=>{
        return (
          <li key={item.id}>
            <div className='title'>
              <span className='cate'>
                <Icon color='green' name='users' size='small' />
                思维
              </span>
              <span>
                {item.question_name}
              </span>
            </div>
            {item.answer_content&&(
              <div className='user'>
                <Icon circular name='users' size='mini'/>
                {item.username} 的回答
              </div>
            )}
            <div className="info">
              {item.answer_content}
            </div>
            <div className="tag">
              {item.question_tag&&item.question_tag.split(',').map((tag,index)=>{return <span key={index}>{tag}X</span>})}
              <span>{item.qnum?item.qnum:0}个回答</span>
            </div>
          </li>
        );
      });
      listTpl = (
        <div>
          <div className="info-ask-btn">
            <Button fluid color='green'>快速提问</Button>
          </div>
          <div className="info-ask-list">
            {faqInfo}
          </div>
        </div>
      );
    }
    return listTpl;
  }
}

class LoadMore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 列表数据
      list: [],
      // 列表总数
      total: 0,
      // 当前记录数
      pagenum: 0,
      // 每页加载条数
      pagesize: 2,
      // 控制是否还有更多数据
      hasMore: true,
      // 控制进度条开始或结束：开始为1，结束为2
      initializing: 1
    }
  }
  loadData = async () => {
    // 列表类型：1表示资讯；2表示头条；3表示问答
    let { type } = this.props;
    // 封装通用的接口调用方法
    let {data: {list:{data,total}}} = await http.post('infos/list', {
      type: type,
      pagenum: this.state.pagenum,
      pagesize: this.state.pagesize
    })
    this.setState({
      list: this.state.pagenum===0?data:[...this.state.list,...data],
      total:total,
      initializing:2
    });
  }
  refresh = (resolve, reject) => {
    // 处理刷新
    this.setState({
      pagenum: 0,
      initializing:1
    },()=> {
      this.loadData()
    })
    resolve();
  }

  loadMore = (resolve, reject) => {
    let {pagenum,pagesize,total} = this.state
    // 处理加载更多
    this.setState({
      pagenum: pagenum + pagesize,
      initializing: 1
    },() => {
      this.loadData()
      // 没有更多数据了，终止接口继续调用
      this.setState({
        hasMore: this.state.pagenum+pagesize < total? true:false
      })
    })
    resolve();
  }
  componentDidMount () {
    this.loadData()
  }
  render () {
    let { hasMore, list, initializing } = this.state;
    let { type } = this.props;
    return (<div className='view'>
      <Tloader
        className="main"
        onRefresh={this.refresh}
        onLoadMore={this.loadMore}
        hasMore={hasMore}
        initializing={initializing}
        >
        {/*插槽----里面就是列表信息*/}
        <ul>
          <CommonList type={type} list={list}/>
        </ul>
      </Tloader>
    </div>);
  }
}

export default LoadMore