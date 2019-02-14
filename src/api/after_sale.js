import request from '@/utils/request'

import {
  GetVisitData
} from '@/utils'

// 获取一页退款订单列表
export function applyRefundPage(data) {
  return request({
    url: '/Refund/ApplyRefundPage',
    method: 'POST',
    data: GetVisitData(data)
  })
}
// 退款详情接口
export function refundInfo(data) {
  return request({
    url: '/Refund/RefundInfo',
    method: 'POST',
    data: GetVisitData(data)
  })
}
// 同意退款申请
export function agreeRefundApply(data) {
  return request({
    url: '/Refund/AgreeRefundApply',
    method: 'POST',
    data: GetVisitData(data)
  })
}
// 拒绝退款申请
export function refuseRefundApply(data) {
  return request({
    url: '/Refund/RefuseRefundApply',
    method: 'POST',
    data: GetVisitData(data)
  })
}
// 管理员确认退款
export function confirmRefund(data) {
  return request({
    url: '/Refund/ConfirmRefund',
    method: 'POST',
    data: GetVisitData(data)
  })
}
