import axios from 'axios'

const service = axios.create({
    timeout:5000,
    baseURL:window.gl?window.gl.baseApi:''
})

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        let res = response.data;

        if( !res.code||res.code==200 ) return res.data
        else return Promise.reject(e) 
    },
    error => {
        let e = error.toString()
        return Promise.reject(e)
    }
)

export default service