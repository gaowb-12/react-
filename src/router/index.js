import loadable from '@loadable/component'
const LoginComponent = loadable(() => import('../containers/Login'))
// const LoginComponent = loadable(() => import('../containers/Login'))

const routes=[
    {path:"/",component:LoginComponent},
    {path:"/login",component:LoginComponent},
    {path:"/register",component:LoginComponent},
]
export default routes