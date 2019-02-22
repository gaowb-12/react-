import { GetUserinfo } from "../api/fetch";
// actions
export const actions={
    UPDATE:"userInfo/UPDATE"
}

// reducer
export default function reducer(state={},action){
    switch (action.type) {
        case actions.UPDATE:
            return {...state,...action.user_info};
        default: return state;
    }
}

// action creators
export const actionCreators={
    updateUserInfo:function(user_info){
        return {type:actions.UPDATE,user_info}
    }
}

// 初始加载userInfo，请求数据,异步提交
export function loadUserInfo(dispatch){
    return GetUserinfo({
        access_token: localStorage.getItem("access_token")
    })
    .then(res => {
        // console.log(res.user)
        if (res.errcode == "110") {
            // 同步用户信息到全局
            if(!res.user.head_image){
                res.user.head_image=require("../common/images/boy0.jpg")
            }
            dispatch(actionCreators.updateUserInfo(res.user))
        }
    })
    .catch(err => {
        console.log(err)
    });
}