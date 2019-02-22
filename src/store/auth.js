// actions
export const actions={
    UPDATE:"auth/UPDATE"
}
// 登录状态
const loginState={
    isLogin:localStorage.getItem("access_token")?true:false,
    token:localStorage.getItem("access_token")
}
// reducer
export default function reducer(state=loginState,action){
    switch (action.type) {
        case actions.UPDATE:
            return {...state,isLogin:action.isLogin};
        default: return state;
    }
}

// action creators
export const authActionCreators={
    updateLoginState:function(isLogin){
        return {type:actions.UPDATE,isLogin}
    }
}