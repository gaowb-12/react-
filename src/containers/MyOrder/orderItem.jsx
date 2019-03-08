import React from 'react';
const orderState={
    '-1':"交易关闭",
    '0':"待付款",
    '1':"交易完成"
}
function OrderItem(props){
    return (
        <div className="order-item" style={{...props.style}}>
            {/* 订单时间跟状态 */}
            <div className="order-item-time">
                <span className="order-item-time_">订单时间：{props.pay_time}</span>
                <span className="order-item-state">{orderState[props.s_state]}</span>
            </div>
            {props.children}
            {/* 订单数量跟金额 */}
            <div className="order-item-total">
                <p>
                    <span>共{props.num}件商品</span>
                    <span>实付款￥{props.pay_price/100}</span>
                    <span>（使用优惠券￥{props.coupons}）</span>
                </p>
                {/* 操作订单 */}
                <ul>
                    {
                        props.s_state==-1?(
                            <li>删除订单</li>
                        ):(props.s_state==0?(
                            <div>
                                <li>取消订单</li>
                                <li>继续支付</li>
                            </div>
                        ):null)
                    }
                </ul>
            </div>
        </div>
    )
}
export default OrderItem