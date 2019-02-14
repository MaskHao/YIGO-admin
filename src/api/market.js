import request from '@/utils/request'

import {
  GetVisitData
} from '@/utils'

// 新增推荐商品接口
export function addRecommend(data) {
  return request({
    url: '/Market/AddRecommend',
    method: 'POST',
    data: GetVisitData(data)
  })
}
// DeleteRecommend
export function deleteRecommend(data) {
  return request({
    url: '/Market/DeleteRecommend',
    method: 'POST',
    data: GetVisitData(data)
  })
}

// RecommendList
export function recommendList(data) {
  return request({
    url: '/Market/RecommendList',
    method: 'POST',
    data: GetVisitData(data)
  })
}

// RecommendSort
export function recommendSort(data) {
  return request({
    url: '/Market/RecommendSort',
    method: 'POST',
    data: GetVisitData(data)
  })
}

// BannerList
export function BannerList(data) {
  return request({
    url: '/Market/BannerList',
    method: 'POST',
    data: GetVisitData(data)
  })
}

// AddBranner
export function addBranner(data) {
  return request({
    url: '/Market/AddBranner',
    method: 'POST',
    data: GetVisitData(data)
  })
}

// DeleteBranner
export function deleteBranner(data) {
  return request({
    url: '/Market/DeleteBranner',
    method: 'POST',
    data: GetVisitData(data)
  })
}

// BrannerSort
export function brannerSort(data) {
  return request({
    url: '/Market/BrannerSort',
    method: 'POST',
    data: GetVisitData(data)
  })
}
