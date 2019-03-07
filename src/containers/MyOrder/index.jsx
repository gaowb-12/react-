import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./index.less"
import { Menu } from 'antd';
import Order from '../../components/order';
import OrderItem from './orderItem';
import { GetOrderList } from '../../api/fetch';

class MyOrder extends Component {
    constructor(props){
        super(props)
        this.getOrderLists=this.getOrderLists.bind(this)
        this.state = {
            current: 'all',
            orderLists:[],
            page_no:1,//页码
            page_size:6,//每页的记录数,初始为0
            page_num:6,//每次加载的记录数量(恒值)
            counts:0,//总记录数
            loadingMore:true, //节流，是否加载更多(初始化赋值true，需要加载更多)
        }
        this.orderStateType={
            'close':-1,
            'all':0,
            'unpaid':1,
            'finished':2
        }
    }
    // 判断渲染的动态组件
    shouldComponentUpdate(newprops,newstate){
        if(this.props.location.pathname!=newprops.location.pathname){//判断是否是不同状态的组件
            this.getOrderLists(newprops)
        }
        return true
    }
    throttle=false//节流，判断滚动事件
    componentDidMount(){
        this.getOrderLists(this.props)
        // 绑定滚动事件
        document.addEventListener("scroll",()=>{
            if(this.state.loadingMore) return;//判断上一次数据是否加载结束
            if(this.state.counts<=this.state.page_size) {//当前页的记录数大于等于总记录
                this.setState({
                    loadingMore:false
                })
                return 
            };
            // 获取距离
            const offsetHeight =document.body.offsetHeight//整个body的高度
            const scrollTop =window.pageYOffset||0//页面被隐藏的上面的高度
            const clientHeight =window.innerHeight||0//页面可视区域的高度

            // 计算距离
            if(offsetHeight-scrollTop-clientHeight<=20){
                this.throttle=true//禁止滚动加载数据
                this.setState({
                    loadingMore:true,
                    page_size:this.state.page_size+this.state.page_num,
                },()=>{
                    this.throttle=false//加载数据
                    this.getOrderLists(this.props);
                })
            }
        })
    }
    getOrderLists(props){
        GetOrderList({
            access_token:localStorage.getItem("access_token"),
            page_no:this.state.page_no,//当前页
            page_size:this.state.page_size,//每页条数
            type:this.orderStateType[props.match.params.orderState]//订单类型
        })
        .then((res)=>{
            console.log(res)
            this.setState({
                current:props.match.params.orderState,//tab切换
                loadingMore:false,//数据加载完成，不在加载
                orderLists:res.result._APP_RESULT_LIST,//获取list列表
                counts:res.result._APP_RESULT_COUNT//获取订单总记录数
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    handleClick = (e) => {
        this.setState({
          current: e.key,
        });
    }
    render(){
        return (
            <div>
                {/* tab */}
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    style={{backgroundColor:"#f4f4f4",color:"#999",borderBottomColor:"#999",textAlign:"center",position:"fixed",width:"100%"}}
                >
                    <Menu.Item key="all" style={{width:"25%"}}>
                        <Link to="/myorders/all" replace>全部</Link>
                    </Menu.Item>
                    <Menu.Item key="unpaid" style={{width:"25%"}}>
                        <Link to="/myorders/unpaid" replace>代付款</Link>
                    </Menu.Item>
                    <Menu.Item key="close" style={{width:"25%"}}>
                        <Link to="/myorders/close" replace>交易关闭</Link>
                    </Menu.Item>
                    <Menu.Item key="finished" style={{width:"25%"}}>
                        <Link to="/myorders/finished" replace>已完成</Link>
                    </Menu.Item>
                </Menu>

                {/* 订单 */}
                <div className="list_order">
                    {
                        this.state.orderLists
                        ?
                        (
                            this.state.orderLists.length>0
                            ?
                            this.state.orderLists.map(item=>(
                                <OrderItem  
                                    key={item.id} 
                                    style={{marginBottom:"0.2rem"}} 
                                    pay_time={item.pay_time} 
                                    num={item.product_info.length} 
                                    pay_price={item.pay_price} 
                                    coupons={item.coupons} 
                                    s_state={item.s_state}
                                >
                                {
                                    item.product_info.map(product=>(
                                        <Order key={product.pid} {...product} />
                                    ))
                                }
                                    
                                </OrderItem>
                            ))
                            :
                            <div>暂无数据</div>
                        )
                        :
                        null
                    }
                    {
                        this.state.loadingMore?
                        <div style={{textAlign:"center"}}><img src={require("../../common/images/running.gif")} style={{width:"30px"}}/>正在努力加载</div>
                        :
                        null
                    }
                </div>
            </div>
        )
    }
}
export default MyOrder