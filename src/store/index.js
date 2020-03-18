import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import login from './modules/login'
import view from './modules/view'
export default new Vuex.Store({
    modules:{
        login,
        view
    }
})