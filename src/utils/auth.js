import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token';
const user = 'user';
const pwd = 'pwd';

export function getToken() {
  return Cookies.get(TokenKey)
}
export function getUser() {
  return Cookies.get(user)
}
export function getPwd() {
  return Cookies.get(pwd)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function setUser(userName) {
  Cookies.set(user, userName);
}
export function setPwd(password) {
  Cookies.set(pwd, password);
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function removeUser() {
  return Cookies.remove(user)
}
export function removePwd() {
  return Cookies.remove(pwd)
}
