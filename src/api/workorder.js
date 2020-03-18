// 树形控件
import fetch from '@/utils/fetch'
import qs from 'qs'

// 跟节点
export function treeControl() {
    return fetch({
        url: '/dataCategory',
        method: 'get'
    })


}
// 子节点
export function sonControl(params) {
    return fetch({
        url: '/dataCategory',
        method: 'get',
        params: params

    })
}
// 添加
export function AddControl(data) {
    return fetch({
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        url: '/dataCategory',
        method: 'post',
        data: data

    })
}
// 编辑
export function compileControl(data) {
    return fetch({
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        url: '/dataCategory',
        method: 'patch',
        data: data

    })
}

// 删除
export function deleteControl(id) {
    return fetch({
        url: '/dataCategory/' + id,
        method: 'delete',

    })
}