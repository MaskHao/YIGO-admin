import request from '@/utils/request'
import {
  GetVisitData
} from '@/utils'

// 新增积分产品
export function addPointProduct(data) {
  return request({
    url: 'PointMarket/AddPointProduct',
    method: 'post',
    data: GetVisitData(data)
  })
}

// 修改积分产品
export function updatePointProduct(data) {
  return request({
    url: 'PointMarket/UpdatePointProduct',
    method: 'post',
    data: GetVisitData(data)
  })
}

// 获取一页积分产品列表
export function pointProductPage(data) {
  return request({
    url: 'PointMarket/PointProductPage',
    method: 'post',
    data: GetVisitData(data)
  })
}

// 积分产品详情
export function pointProductInfo(data) {
  return request({
    url: 'PointMarket/PointProductInfo',
    method: 'post',
    data: GetVisitData(data)
  })
}

