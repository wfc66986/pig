// 编码段
import fetch from '@/utils/fetch'
import qs from 'qs'


// 添加
export function AddSection() {
    return fetch({
        url: '/identifyingCode',
        method: 'get',

    })
}


// 修改
export function codingSection(data) {
    return fetch({
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        url: '/identifyingCode',
        method: 'post',
        data: data
    })
}

