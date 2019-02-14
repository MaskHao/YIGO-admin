'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 正式接口
  // IMAGE_API: '"http://updapi.yigshop.com"',
  // BASE_API: '"http://admapi.yigshop.com"'

  // 测试接口
  IMAGE_API: '"http://testupdapi.yigshop.com"',
  BASE_API: '"http://testadmapi.yigshop.com"'
});
