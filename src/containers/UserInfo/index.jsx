import React, { Component } from 'react';
import { connect } from "react-redux"
import "./index.less"
import { actionCreators } from "../../store/userInfo";
import { Button } from "antd";
import InfoItem from "./infoItem";
import InfoItemLayer from "./infoItemLayer";
import Mask from "../../components/mask";
import {UpdateUserinfo} from "../../api/fetch"

const mapStateToProps=(state)=>{
    return state
}
const mapDispatchToProps=(dispatch)=>{
    return {
        updateUserInfo(user){//更新用户信息
            dispatch(actionCreators.updateUserInfo(user))
        }
    }
}
class UserInfo extends Component {
    constructor(props){
        super(props)
        this.uploadHeader=this.uploadHeader.bind(this)
        this.setNickname=this.setNickname.bind(this)
        this.blur=this.blur.bind(this)
        this.setInfo=this.setInfo.bind(this)
        this.cancelSetInfo=this.cancelSetInfo.bind(this)
        this.selectInfo=this.selectInfo.bind(this)
        this.updateUserinfo=this.updateUserinfo.bind(this)
        this.state={
            grades:['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级'],
            eng_vers:['新起点','PEP','精通'],
            sexs:["男","女"],//2男，1女 
            ages:(()=>{
                const ages=[];
                for(let i=0;i<16;i++){
                    ages.push(i+1+"岁")
                }
                return ages
            })(),
            selected:false, //是否弹出信息选择框
            user_info:null,
            nickInput:false//是否显示nickname输入框
        }
    }
    static getDerivedStateFromProps(newprops,newstate){
        if(!newstate.user_info){//初始加载user_info
            return {user_info:newprops.user_info}
        }else{
            return {}
        }
    }
    componentDidUpdate(){//组件更新完成的时候，自动获取修改nickname的焦点
        if(this.state.nickInput){
            this.input.focus()
        }
    }
    // 上传头像
    uploadHeader(event){
        var file=event.target.files[0];
        var fr= new FileReader();
        fr.readAsDataURL(file);
        fr.onload=()=>{
            this.setState({
                user_info:{...this.state.user_info,head_image:fr.result}
            })
        }
    }
    // 设置昵称
    setNickname(event){
        this.setState({
            nickInput:true
        })
        //隐藏显示设置按钮
        this.nickname=event.target
        this.nickname.style.display="none"
    }
    blur(){
        this.setState({
            nickInput:false,
            user_info:{...this.state.user_info,nickname:this.input.value}
        })
        this.nickname.style.display="block"
    }
    setInfo(info){// 设置信息
        return ()=>{
            this.setState({
                selected:info
            })
        }
    }
    selectInfo(info){ // 选中信息,采用惰性载入函数
        if(info=="grade"||info=="age"){
            return (event)=>{
                this.setState({
                    user_info:{...this.state.user_info,[info]:event.target.getAttribute("index")},
                    selected:false
                })
            }
        }
        if(info=="eng_ver"){
            return (event)=>{
                this.setState({
                    user_info:{...this.state.user_info,[info]:event.target.innerText},
                    selected:false
                })
            }
        }
        if(info=="sex"){
            return (event)=>{
                console.log(event.target.innerText)
                this.setState({
                    user_info:{...this.state.user_info,[info]:(event.target.innerText=="女"?1:2)},
                    selected:false
                })
            }
        }
    }
    cancelSetInfo(){//取消设置
        this.setState({
            selected:false
        })
    }
    // 提交数据
    updateUserinfo(){
        UpdateUserinfo({
            access_token:localStorage.getItem("access_token"),
            ...this.state.user_info
        })
        .then((res)=>{
            console.log(res)
            if(res.errcode==110){
                console.log({...this.state.user_info})
                this.props.updateUserInfo({...this.state.user_info});
            }else{
                alert("failed")
            }
        })
        .catch((res)=>{
            
        });
    }
    render(){
        const userinfo=this.state.user_info
        return (
            <div>
                <div className="userinfo-top">
                    公开信息
                </div>
                {/* 个人信息 */}
                <div className="userinfo-con">
                    {/* 上传头像 */}
                    <div className="con-header">
                        <div className="upload-header">
                            <div className="header-tip">头像</div>
                            <div className="header-img">
                                <div className="header-img-tip">上传图片</div>
                                <img src={this.state.user_info.head_image}/>
                                <input type="file" onChange={this.uploadHeader} />
                            </div>
                        </div>
                        <div className="system-header">
                            <span>选择系统头像</span>
                        </div>
                    </div>
                    
                    {/* 昵称 */}
                    <InfoItem text="昵称" content={userinfo.nickname} set={this.setNickname}>
                        <div style={{display:this.state.nickInput?"block":"none"}}>
                            <input type="text" style={{width:"100%",padding:"0 10px"}} defaultValue={userinfo.nickname} ref={(input)=>{this.input=input}} maxLength="10" onBlur={this.blur} />
                        </div>
                    </InfoItem>

                    {/* 年级 */}
                    <InfoItem text="年级" content={userinfo.grade+"年级"} set={this.setInfo("grades")}/>

                    {/* 英语版本 */}
                    <InfoItem text="英语版本" content={userinfo.eng_ver} set={this.setInfo("eng_vers")}/>

                    {/* 年龄 */}
                    <InfoItem text="年龄" content={userinfo.age+"岁"} set={this.setInfo("ages")}/>

                    {/* 性别 */}
                    <InfoItem text="性别" content={userinfo.sex==0?"未设置":(userinfo.sex==1?"女":"男")} set={this.setInfo("sexs")}/>

                </div>
                {/* 遮罩 */}
                <div>
                    <Mask style={{zIndex:"1",display:this.state.selected?"block":"none"}} on={this.cancelSetInfo}/>
                    <InfoItemLayer item={this.state.grades}  isShow={this.state.selected=="grades"} selectInfo={this.selectInfo("grade")} cancelSetInfo={this.cancelSetInfo}/>
                    <InfoItemLayer item={this.state.eng_vers}  isShow={this.state.selected=="eng_vers"} selectInfo={this.selectInfo("eng_ver")} cancelSetInfo={this.cancelSetInfo}/>
                    <InfoItemLayer item={this.state.ages}  isShow={this.state.selected=="ages"} selectInfo={this.selectInfo("age")} cancelSetInfo={this.cancelSetInfo}/>
                    <InfoItemLayer item={this.state.sexs}  isShow={this.state.selected=="sexs"} selectInfo={this.selectInfo("sex")} cancelSetInfo={this.cancelSetInfo}/>
                </div>
                {/* 保存 */}
                <div style={{margin:"0.2rem"}}>
                    <Button style={{background:"#22d37a",color:"#fff",height:"0.8rem"}} block onClick={this.updateUserinfo}>保存</Button>
                </div>
            </div>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(UserInfo)