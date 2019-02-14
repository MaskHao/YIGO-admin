// import { login, logout, getInfo, addUser } from '@/api/user'
import {
  login,
  addUser,
  updatePwd
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken,
  removeUser,
  removePwd,
  setUser,
  setPwd,
  getUser,
  getPwd
} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    id: null,
    name: '',
    avatar: '',
    roles: [],
    status: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_STATUS: (state, status) => {
      state.status = status
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      const username = userInfo.username.trim();
      setUser(username);
      setPwd(userInfo.password);
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          // 加密返回结果
          const adminInfo = response.Value;
          const role = adminInfo.AdminSuper ? 'adminSuper' : 'admin';
          commit('SET_ID', adminInfo.AdminID);
          commit('SET_NAME', adminInfo.AdminName);
          commit('SET_AVATAR', adminInfo.AdminHeadUrl);
          commit('SET_STATUS', adminInfo.AdminStatus);
          setToken(role);
          commit('SET_TOKEN', role);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 刷新重新获取信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        const username = getUser();
        const pwd = getPwd();
        login(username, pwd).then(response => {
          const adminInfo = response.Value;
          const role = adminInfo.AdminSuper ? 'adminSuper' : 'admin';
          commit('SET_ID', adminInfo.AdminID);
          commit('SET_NAME', adminInfo.AdminName);
          commit('SET_AVATAR', adminInfo.AdminHeadUrl);
          commit('SET_ROLES', role);
          commit('SET_STATUS', adminInfo.AdminStatus);
          setToken(role);
          commit('SET_TOKEN', role);
          resolve(role)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      removeToken();
      removeUser();
      removePwd();
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve()
      })
    },

    // 添加管理员
    AddUser({
      commit,
      state
    }, user) {
      return new Promise((resolve, reject) => {
        addUser(user).then(res => {
          resolve(res);
        })
      })
    },

    // 修改密码
    UpdatePwd({
      commit
    }, userInfo) {
      const password = userInfo.UserPwd.trim();
      return new Promise((resolve, reject) => {
        updatePwd(userInfo.UserId, password).then(res => {
          setPwd(password);
          resolve(res);
        })
      })
    }
  }
}

export default user
