import React from "react";
import { Button } from "antd";
function InfoItemLayer(props){
    return (
        <div className="info-item-layer" style={{display:props.isShow?"block":"none"}}>
            <div className="info-item-layer-item">
                {
                    props.item.map((item,index)=>
                        <div key={item} className="choice-item" index={index+1} onClick={props.selectInfo}>{item}</div>
                    )
                }
            </div>
            <div className="info-item-layer-cancel">
                <Button  style={{background:"#22d37a",color:"#fff",height:"0.8rem"}} block onClick={props.cancelSetInfo}>取消</Button>
            </div>
        </div>
    )
}
export default InfoItemLayer