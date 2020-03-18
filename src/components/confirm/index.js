import Vue from 'vue'
import Confirm from './confirmBox'

const ConfirmBox = Vue.extend(Confirm);

Confirm.install = (config={}) => {
    let instance = new ConfirmBox({
        data: config
    }).$mount();

    document.body.appendChild(instance.$el);

    return instance.confirm();
}

// import confirmBox from './confirmBox'
// const ConfirmBoxConstructor = Vue.extend(confirmBox)
// const Confirm = (config={}) => {
//     const ConfirmInstance = new ConfirmBoxConstructor({
//         data:config,
//     })

//     ConfirmInstance.vm = ConfirmInstance.$mount()

//     document.body.appendChild(ConfirmInstance.vm.$el)

//     return ConfirmInstance.confirm()
// }
//  Vue.prototype.$confirm = Confirm


export default {
    install:Vue => {
        Vue.prototype.$decide = Confirm.install
    }
}