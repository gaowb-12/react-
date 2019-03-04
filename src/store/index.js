// redux
import { createStore,applyMiddleware,combineReducers } from "redux";
import { Provider } from "react-redux";

//applyMiddleware
import createLogger from "redux-logger";//记录日志
import thunk from "redux-thunk";//异步redux
// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from 'redux-devtools-extension'

// import reducer
import user_info,{loadUserInfo} from "./userInfo";//用户信息
import auth from "./auth";//登录状态

// combineReduces
const reducer=combineReducers({
    user_info,
    auth
})

// 创建store
const store=createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk,createLogger)
    )
    
)
// 初始化userInfo
store.dispatch(loadUserInfo);

export {
    store,
    Provider
}