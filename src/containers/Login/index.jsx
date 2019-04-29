import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import { actionCreators } from "../../store/userInfo";
import { authActionCreators } from "../../store/auth";
import { Input,Button } from "antd";
import "./index.less"
import { LoginSucc } from "../../api/fetch";

const mapStateToProps=(state)=>{
    return state
}
const mapDispatchToProps=(dispatch)=>{
    return {
        updateUserInfo(user){//更新用户信息
            dispatch(actionCreators.updateUserInfo(user))
        },
        updateLoginState(isLogin){//更新登录状态
            dispatch(authActionCreators.updateLoginState(isLogin))
        }
    }
}
class Login extends Component {
    constructor(props){
        super(props)
        this.getInput=this.getInput.bind(this)
        this.submit=this.submit.bind(this)
        this.state={
            username:"",//用户名
            password:"",//密码
            dev_id:"101",
            dev_name:"gao",
            val:0
        }
    }
    // [key]=username输入用户名  [key]=password输入密码
    getInput(key){
        return (e)=>{
            this.setState({
                [key]:e.target.value
            })
        }
    }
    submit(){
        LoginSucc({
            username: this.state.username,
            pwd: this.state.password,
            dev_id:this.state.dev_id,
            dev_name:this.state.dev_name,
        })
        .then((res)=>{
            // console.log(res)
            if(res.errcode==110){
                localStorage.setItem("access_token", res.access_token);
                localStorage.setItem("user_id", res.user_info.user_id);
                this.props.updateUserInfo(res.user_info);
                this.props.updateLoginState(true);
                this.props.history.push("/user")
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return (
            <div>
                <div className="login-header">
                    <img src={require("../../common/images/boy0.jpg")} />
                </div>
                {/* 用户名 */}
                <div className="user">
                    <span className="iconfont_cellphone"></span>
                    <Input
                    className="input username"
                    onChange={this.getInput("username")}
                    value={this.state.username}
                    placeholder="请输入手机号/用户名"
                    />
                </div>
                {/* 密码 */}
                <div className="user">
                    <span className="iconfont_key"></span>
                    <Input.Password 
                    visibilityToggle={false}
                    className="input password"
                    onChange={this.getInput("password")}
                    value={this.state.password}
                    placeholder="请输入密码"
                    />
                </div>
                {/* 忘记密码 */}
                <div style={{overflow:"hidden"}}>
                    <Link className="forgetPwd" to="/login">忘记密码？</Link>
                </div>
                {/* 登录，注册 */}
                <div style={{padding:"0 0.2rem"}}>
                    <div onClick={this.submit}><Button className="button login" block>登录</Button></div>
                    <Link to="/register">
                        <Button className="button register" block>注册</Button>
                    </Link>
                </div>
                
            </div>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)
