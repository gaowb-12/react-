import React from "react";
function InfoItem(props){
    return (
        <div className="info-item">
            <div className="info-item-text">{props.text}</div>
            <div className="info-item-set" onClick={props.set}>
                <div className="info-item-content">{props.content}</div>
            </div>
            {props.children}
        </div>
    )
}
export default InfoItem