import React from 'react'

function Mask(props){
    return (
        <div style={{position:"fixed",left:"0",top:"0",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.3)",...props.style}} onClick={props.on}>
            {props.children}
        </div>
    )
}

export default Mask