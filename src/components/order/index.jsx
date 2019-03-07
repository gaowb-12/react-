import React from 'react'
import './index.less'

function Order(props){
    return (
        <div className="order-common" style={props.style}>
            {/* 图片 */}
            <div className="order-common-img">
                <img src={props.cover_image}/>
                {/*  onError={(event)=>{event.target.src=require('../../images/gray_1.png')}} */}
            </div>

            {/* 描述 */}
            <div className="order-common-con">
                <p>{props.name}</p>
                <p style={{color:"#999"}}>{props.validity}</p>
                <p style={{backgroundColor:"#feaf5f",padding:"1px 3px",display:"inline-block",color:"#fff",borderRadius:"2px"}}>{props.service_type}</p>
            </div>

            {/* 商品原金额跟数量 */}
            <div className="order-common-money">
                <p>￥{props.price}</p>
                <p style={{color:"#999"}}>×{props.num}</p>
            </div>
        </div>
    )
}

export default Order