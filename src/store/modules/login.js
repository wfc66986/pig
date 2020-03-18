import dynamicRouteMap from '@/mock'
import Layout from '@/views/Layout'
import {setUserInfo, removeUserInfo} from '@/utils/auth'
import {Encrypt} from '@/utils/tools'

const _import = x => () => import('@/pages/' + x + '/index.vue')

function generateRoutes(routesArr){
    routesArr.forEach(routes => {
        if(routes.component){
            if(routes.component === 'Layout') routes.component = Layout
            else routes.component = _import(routes.component)
        }

        routes.meta = {
            name:routes.menuName
        }

        if(routes.children&&routes.children.length){
            generateRoutes(routes.children)
        }
    })

    return routesArr
}

const login = {
    namespaced: true,
    state:{
        token:null,
        menuRoutes:[]
    },
    mutations:{
        'encyrpt/userInfo':(state, res) => {
            setUserInfo(Encrypt(res.username), Encrypt(res.password));
        },
        'set/routes':(state, res) => {
            if(res) state.menuRoutes = res
            else state.menuRoutes = []
        },
    },
    actions:{
        DebugLogin({commit}, data){
            return new Promise((resolve)=>{
                let routesArr = generateRoutes(dynamicRouteMap)
                commit('encyrpt/userInfo', data)
                commit('set/routes', routesArr)
                resolve(routesArr)
            })
        },
        logout({commit, state, dispatch}){
            return new Promise((resolve, reject)=>{
                commit('set/routes', null)
                removeUserInfo()
                // dispatch('view/delAllViews', null, { root: true })
                resolve()
            })
        }
    }
}

export default login