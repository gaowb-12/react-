import React from 'react';
import { Icon } from "antd";

function Item(props){
    return (
        <div style={{padding: "0.25rem",borderBottom:"1px solid #f4f4f4"}}>
            <div className="user-item">
                <div className="item-icon">
                    <img src={props.src}/>
                </div>
                <div className="item-text">{props.text}</div>
                <div className="item-arrow">
                    {props.children}
                    <Icon type="right" style={{fontSize:"1px",marginLeft:"5px"}} />
                </div>
            </div>
        </div>
    )
}
export default Item