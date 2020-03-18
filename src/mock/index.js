// 卷包过程
import juanbaoRouter from './juanbao'

const dynamicRouteMap = [
    {
        path:'/',
        component:'Layout',
        children:[
            juanbaoRouter
        ]
    }
]

export default dynamicRouteMap