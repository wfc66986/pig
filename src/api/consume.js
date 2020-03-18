// List列表
import fetch from '@/utils/fetch'
import qs from 'qs'
//列表默认
export function listRequest(data) {
    return fetch({
        url: '/collectionData/page',
        method: 'get',
        params: data
    })
}
// 编辑
export function compileRequest(data) {
    return fetch({
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        url: '/collectionData',
        method: 'patch',
        data: data
    })
}
// 删除
export function deleteRequest(ids) {
    return fetch({
        url: '/collectionData/' + ids,
        method: 'delete',

    })
}