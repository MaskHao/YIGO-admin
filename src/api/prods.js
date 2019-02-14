import request from '@/utils/request'
import {
  GetVisitData
} from '@/utils'
// const IMAGE_API = process.env.IMAGE_API;

// 获取产品信息
export function prodInfo(data) {
  return request({
    url: '/Product/ProductInfo',
    method: 'post',
    data: GetVisitData(data)
  })
}

// 获取一页产品列表
export function prodPage(data) {
  return request({
    url: '/Product/ProductPage',
    method: 'post',
    data: GetVisitData(data)
  })
}

// 添加产品
export function prodAdd(data) {
  return request({
    url: '/Product/ProductAdd',
    method: 'post',
    data: GetVisitData(data)
  })
}

// 产品修改
export function prodUpdate(data) {
  return request({
    url: '/Product/UpdateProduct',
    method: 'post',
    data: GetVisitData(data)
  })
}

// 产品审核接口
export function prodCheck(data) {
  return request({
    url: '/Product/CheckProduct',
    method: 'post',
    data: GetVisitData(data)
  })
}

// 产品上下架
export function prodOnOff(data) {
  return request({
    url: '/Product/OnOffProduct',
    method: 'post',
    data: GetVisitData(data)

  })
}

// 产品删除
export function prodDel(data) {
  return request({
    url: '/Product/DeleteProduct',
    method: 'post',
    data: GetVisitData(data)
  })
}
