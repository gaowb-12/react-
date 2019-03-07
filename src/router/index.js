import React from 'react';
import { Route,Switch,Redirect,withRouter  } from 'react-router-dom';

import loadable from '@loadable/component'
import Authen from '../Auth'

const LoginComponent = loadable(() => import('../containers/Login'))
const RegisterComponent = loadable(() => import('../containers/Register'))
const UserComponent = loadable(() => import('../containers/User'))
const UserInfoComponent = loadable(() => import('../containers/UserInfo'))
const MyOrderComponent = loadable(() => import('../containers/MyOrder'))

// const routes=[
//     {path:"/login",component:LoginComponent},
//     {path:"/register",component:RegisterComponent},
//     {path:"/user",component:UserComponent},
//     {path:"/*",component:Auth},
// ]

const routes=(
    <Switch>
        <Route path="/login" component={LoginComponent}></Route>
        <Route path="/register" component={RegisterComponent}></Route>
        <Route path="/user" component={Authen(UserComponent)}></Route>
        <Route path="/userinfo" component={Authen(UserInfoComponent)}></Route>
        <Route path="/myorders/:orderState" component={Authen(MyOrderComponent)}></Route>
        <Redirect exact from="/*" to="/login" ></Redirect>
    </Switch>
    
)
export default routes