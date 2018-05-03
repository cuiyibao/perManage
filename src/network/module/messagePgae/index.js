import { getNet } from '../../net-config'
import globalUrl from '../../global.url'

export const net = getNet({
    baseURL: globalUrl.network[0].url
})

export const API_PER = '/api/perMessage'
/**
 * 获取个人信息
 */
export function getDataList() {
    return net.get(API_PER)
}
/**
 * 新增个人信息
 */
export function addDataList(params) {
    return net.post(API_PER, params)
}
/**
 * 修改个人信息
 */
export function updataDataList() {
    return net.put(API_PER)
}
/**
 * 删除个人信息
 */
export function delDataList(id) {
    return net.delete(API_PER + '/:' + id)
}