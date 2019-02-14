import request from '@/utils/request'
import {
  GetVisitData
} from '@/utils';

// 加密方式登录
export function login(LoginCode, LoginPassword) {
  const loginData = GetVisitData({
    LoginCode,
    LoginPassword
  });
  return request({
    url: '/System/AdminLogin',
    method: 'post',
    data: loginData
  })
}

// 获取用户信息
// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: {
//       token
//     }
//   })
// }

// 登出
// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }

// 修改密码

export function updatePwd(UserId, UserPwd) {
  return request({
    url: '/System/UpdatePwd',
    method: 'post',
    data: GetVisitData({
      UserId,
      UserPwd
    })
  })
}

// 添加管理员
export function addUser(user) {
  return request({
    url: '/System/SystemAdd',
    method: 'post',
    data: GetVisitData(user)
  })
}

// 管理员列表
export function systemList(AdminID) {
  return request({
    url: '/System/SystemList',
    method: 'post',
    data: GetVisitData(AdminID)
  })
}

// 管理员删除
export function deleteSystem(AdminID) {
  return request({
    url: '/System/DeleteSystem',
    method: 'post',
    data: GetVisitData(AdminID)
  })
}
