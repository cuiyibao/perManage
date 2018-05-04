import axios from 'axios'
import extend from 'extend'
import Qs from 'qs'

export function getNet (config) {
    extend(config, {
        timeout: 5000,
        // `withCredentials`指示是否跨站点访问控制请求
        withCredentials: true,
        paramsSerializer: function(params) {
            return Qs.stringify(params, {arrayFormat: 'brackets'})
        },
            
    })
    const net = axios.create(config)
    //添加请求拦截器
    net.interceptors.request.use(
        (request) => {
            if (request.method === 'post' || request.method === 'put') {
                request.data = Qs.stringify(request.data)
            }
            return request
        }, ((error) => {
            Promise.reject(error)
        })
    )

    //添加响应拦截器
    net.interceptors.response.use(
        (response) => {
            return response;
        }, ((error) => {
            Promise.reject(error)
        })
    )
    return net
}