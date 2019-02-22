import React from 'react';
import { Route,Switch,Redirect } from 'react-router-dom';

import loadable from '@loadable/component'
import Authen from '../Auth'

const LoginComponent = loadable(() => import('../containers/Login'))
const RegisterComponent = loadable(() => import('../containers/Register'))
const UserComponent = loadable(() => import('../containers/User'))

// const routes=[
//     {path:"/login",component:Auth(LoginComponent)},
//     {path:"/register",component:RegisterComponent},
//     {path:"/user",component:UserComponent},
//     {path:"/*",component:Auth},
// ]

const routes=(
    <Switch>
        <Route path="/login" component={LoginComponent}></Route>
        <Route path="/register" component={RegisterComponent}></Route>
        <Route path="/user" component={Authen(UserComponent)}></Route>
        <Redirect exact from="/*" to="/login" ></Redirect>
    </Switch>
    
)
export default routes