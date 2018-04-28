import { getNet } from '../../net-config'
import globalUrl from '../../global.url'

export const net = getNet({
    baseURL: globalUrl.network[0].url
})

export function getDataList() {
    return net.get('/egg1')
}