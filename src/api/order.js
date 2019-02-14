import request from '@/utils/request'
import {
  GetVisitData
} from '@/utils'

// 查询一页订单列表
export function orderPage(data) {
  return request({
    url: '/Order/OrderPage',
    method: 'POST',
    data: GetVisitData(data)
  })
}
// 订单详情
export function orderInfo(data) {
  return request({
    url: '/Order/OrderInfo',
    method: 'POST',
    data: GetVisitData(data)
  })
}
// 管理员发货接口
export function orderShip(data) {
  return request({
    url: '/Order/OrderShip',
    method: 'POST',
    data: GetVisitData(data)
  })
}
