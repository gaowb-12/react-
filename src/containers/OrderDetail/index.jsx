import React, { Component } from 'react';
import { connect } from "react-redux"
import "./index.less"
import { actionCreators } from "../../store/userInfo";
import { Button } from "antd";
import InfoItem from "./infoItem";
import InfoItemLayer from "./infoItemLayer";
import {UpdateUserinfo} from "../../api/fetch"


class UserInfo extends Component {
    constructor(props){
        super(props)

        this.state={
            
        }
    }

    render(){
        const userinfo=this.state.user_info
        return (
            <div>
                
            </div>
        )
    }
}
export default UserInfo