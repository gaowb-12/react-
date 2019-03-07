import { getFetch,postFetch } from "./fetchConfig";

//全局路径
const commonUrl = 'https://dianducs.mypep.cn/';//测试环境

// 用户登录的平台秘钥（获取用户信息携带）
window.platform_key="pep_click";

// 登录
async function LoginSucc(data) {
    const res = await postFetch(commonUrl+"user/ak/"+window.platform_key+"/login.anys", data);
    return res.json();
}
// 获取用户信息
async function GetUserinfo(data) {
    const res = await postFetch(commonUrl+"user/ak/"+window.platform_key+"/user/"+localStorage.getItem("user_id")+"/userinfo.json",data);
    return res.json();
}
// 更新用户信息
async function UpdateUserinfo(data) {
    const res = await postFetch(commonUrl+"user/ak/"+window.platform_key+"/user/"+localStorage.getItem("user_id")+"/saveuser.json",data);
    return res.json();
}
// 订单列表
async function GetOrderList(data) {
    const res = await postFetch(commonUrl+'order/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/list.json',data);
    return res.json();
}
export {
    LoginSucc,
    GetUserinfo,
    UpdateUserinfo,
    GetOrderList
}