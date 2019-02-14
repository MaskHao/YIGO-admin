import { JSEncrypt } from 'jsencrypt';
import CryptoJS from 'crypto-js/crypto-js';
// const CryptoJS = require('crypto-js');
import md5 from 'js-md5';
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') {
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    );
  }
}

export function getRSA(param) {
  const encryptor = new JSEncrypt();
  const publicKey =
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDLPKvg29+TIFqMS52FL9AM7tw0+yvlkm8D/vjjox2oF4H8TvquMIMzXWxgQsCLHb0UA+XqURqadMD4Tp5S8OTwkKJPh0ymCxlyV8ZlhfPQ0vHC07yhB1ZNPHpRT+MC6Zp/FnJCKybLGwisTaZ5dlXfgq7l6wFwM0LYbVTWu0NItQIDAQAB';
  encryptor.setPublicKey(publicKey);
  const JsonParam = JSON.stringify(param);
  let rsaPassword = encodeURI(encryptor.encrypt(JsonParam));
  rsaPassword = rsaPassword.replace(/\=/g, '%4S');
  rsaPassword = rsaPassword.replace(/\+/g, '%2B');
  const time = new Date();
  const timeStamp = time.setMinutes(
    time.getMinutes() + time.getTimezoneOffset()
  );
  const sign = md5('mH607fLmHPCF' + '&' + JsonParam + '&' + timeStamp);
  const rsaParam = {
    Parameter: rsaPassword,
    TimeStamp: timeStamp,
    Sign: sign
  };
  return 'strRequest=' + JSON.stringify(rsaParam);
}

export function addSign(params) {
  // const JsonParam = JSON.stringify(params);
  const JsonParam = params;
  let rsaPassword = encodeURI(JsonParam);
  // let rsaPassword = JsonParam;
  rsaPassword = rsaPassword.replace(/\=/g, '%4S');
  rsaPassword = rsaPassword.replace(/\+/g, '%2B');
  const time = new Date();
  const timeStamp = time.setMinutes(
    time.getMinutes() + time.getTimezoneOffset()
  );
  const sign = md5('mH607fLmHPCF' + '&' + JsonParam + '&' + timeStamp);
  const rsaParam = { Parameter: rsaPassword, TimeStamp: timeStamp, Sign: sign };
  return 'strRequest=' + JSON.stringify(rsaParam);
}

function GetTimeStamp() {
  const dtmNow = new Date();
  dtmNow.setMinutes(dtmNow.getMinutes() + dtmNow.getTimezoneOffset()); // 当前时间(分钟) + 时区偏移(分钟)
  return dtmNow.getTime().toString();
}

function GetRandomString(intLength) {
  intLength = intLength || 16;
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < intLength; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
export function GetVisitData(strParameter) {
  let strVisitValue = JSON.stringify(strParameter);
  const strVisitID = GetRandomString(16);
  strVisitValue = CryptoJS.AES.encrypt(
    strVisitValue,
    CryptoJS.enc.Utf8.parse(strVisitID),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }
  );
  strVisitValue = encodeURI(strVisitValue);
  strVisitValue = strVisitValue.replace(/\+/g, '%2B');
  strVisitValue = strVisitValue.replace(/\=/g, '%4S');
  const strTimeStamp = GetTimeStamp();
  let strSign =
    'mH607fLmHPCF' + '&' + JSON.stringify(strParameter) + '&' + strTimeStamp;
  strSign = CryptoJS.MD5(strSign);
  const arrRequest = {
    VisitID: strVisitID,
    Parameter: strVisitValue,
    TimeStamp: strTimeStamp.toString(),
    Sign: strSign.toString()
  };
  const strRequest = 'strRequest=' + JSON.stringify(arrRequest);
  return strRequest;
}
