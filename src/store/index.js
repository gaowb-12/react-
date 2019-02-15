// redux
import { createStore,applyMiddleware } from "redux";
import { Provider } from "react-redux";

//applyMiddleware
import createLogger from "redux-logger";//记录日志
import thunk from "redux-thunk";//异步redux

const store=createStore(function(){
        
    },
    applyMiddleware(thunk,createLogger)
)
export {
    store,
    Provider
}