import React, { Component } from 'react';
import {connect} from 'react-redux';

const mapStateToProps=(state)=>{
    return state
}
function Authen(Compo){
    class Auth extends Component {
        constructor(props){
            super(props)
        }
        componentWillMount() {
            if(!this.props.auth.isLogin){
                this.props.history.push("/login")
            }
        }
        componentWillReceiveProps(nextProps) {
            if(!this.props.auth.isLogin){
                this.props.history.push("/login")
            }
        }
        render(){
            if(this.props.auth.isLogin){
                // 高阶函数子组件无法使用history等方法，需要传递
                return <Compo {...this.props}></Compo>
            }else{
                return null
            }
        }
    }
    return connect(mapStateToProps)(Auth)
}
export default Authen