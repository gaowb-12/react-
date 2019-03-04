import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import "./index.less"
import UserItem from "./userItem";
import { authActionCreators } from "../../store/auth";
import { Button } from "antd";

const mapStateToProps=(state)=>{
    return state
}
const mapDispatchToProps=(dispatch)=>{
    return {
        updateLoginState(isLogin){//更新登录状态
            dispatch(authActionCreators.updateLoginState(isLogin))
        }
    }
}
class User extends Component {
    constructor(props){
        super(props)
        this.layout=this.layout.bind(this)
        this.items=[
            {link:"/login",imgSrc:require("../../common/images/order.png"),text:"我的订单",children:null},
            {
                link:"/userinfo",
                imgSrc:require("../../common/images/person.png"),
                text:"个人信息",
                children:<div>设置年级、教材版本</div>
            },
            {link:"/login2",imgSrc:require("../../common/images/security.png"),text:"账户安全",children:null},
            {link:"/login3",imgSrc:require("../../common/images/feedback.png"),text:"我的反馈",children:null},
            {link:"/login4",imgSrc:require("../../common/images/coupon.png"),text:"我的优惠券",children:null},
            {
                link:"/login5",
                imgSrc:require("../../common/images/recharge.png"),
                text:"我的充值",
                children:   <div>
                                <div>学豆￥{this.props.user_info.beans}</div>
                                <div style={{marginLeft:"15px"}}>立即充值</div>
                            </div>
            },
            {link:"/login6",imgSrc:require("../../common/images/device.png"),text:"设备管理",children:null},
            {link:"/login7",imgSrc:require("../../common/images/acticode.png"),text:"激活码兑换",children:null},
            {link:"/login8",imgSrc:require("../../common/images/contact.png"),text:"联系我们",children:null},
            {link:"/login9",imgSrc:require("../../common/images/setting.png"),text:"系统设置",children:null},
        ]
    }
    layout(){
        localStorage.clear();
        this.props.updateLoginState(false)
        this.props.history.push("/login")
    }
    render(){
        return (
            <div>
                {/* 头像 */}
                <div className="user-header">
                    <div>
                        <img src={require("../../common/images/boy0.jpg")} />
                        <p>{this.props.user_info.nickname}</p>
                    </div>
                </div>
                <div style={{background:"#fff"}}>
                    {
                        this.items.map((item)=>(
                            <Link to={item.link} key={item.link}>
                                <UserItem src={item.imgSrc} text={item.text}>
                                    {item.children}
                                </UserItem>
                            </Link>
                        ))
                    }
                </div>
                <div style={{margin:"0.2rem"}} onClick={this.layout}>
                    <Button style={{background:"#22d37a",color:"#fff",height:"0.8rem"}} block>退出登录</Button>
                </div>
            </div>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(User)