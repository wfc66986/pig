import router from '@/router'
import store from '@/store'
import {getUserInfo} from '@/utils/auth'
import NProgress from 'nprogress'

const whiiteList = ['/login']

router.beforeEach(async(to, from, next) => {
    NProgress.start()
    if(getUserInfo()){
        if(to.path=='/login'){
            next({path:'/'})
            NProgress.done()
        }else{
            if(store.state.login.menuRoutes.length){
                next()
            }else{
                // if(process.env.NODE_ENV=='production'){
                    
                // }else{
                    let menuRoutes = await store.dispatch('login/DebugLogin', getUserInfo())

                    router.addRoutes(menuRoutes)

                    next({...to, replace:true})
                // }
            }
        }
    }else{
        if(whiiteList.indexOf(to.path)!==-1){
            next()
        }else{
            next('/login')
            NProgress.done()
        }
    }
})