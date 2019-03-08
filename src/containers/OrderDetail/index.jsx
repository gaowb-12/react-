import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./index.less"
import Order from '../../components/order';


class UserInfo extends Component {
    constructor(props){
        super(props)

        this.state={
            
        }
    }

    render(){
        return (
            <div>
                <h2>人教数字公司自营</h2>
                <Order />
            </div>
        )
    }
}
export default UserInfo