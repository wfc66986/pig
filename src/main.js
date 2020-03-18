import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/element'
import '@/styles/index.scss'
import '@/permission'
// component
// directive
import drag from '@/directives/drag'
import '@/directives/clickoutside'
//  function
import confirm from '@/components/confirm'
//  Mixin
import commonMixin from '@/mixins/common'

Vue.config.productionTip = false

// component
//全局分页
import pageFooter from '@/components/pageFooter';
// directive
Vue.directive('drag', drag)
// function
Vue.use(confirm)
// mixin
Vue.mixin(commonMixin)
// component
//全局分页
Vue.component('pageFooter', pageFooter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
