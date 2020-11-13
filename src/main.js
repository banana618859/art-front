/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-25 23:35:45
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-11-12 23:22:36
 */
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import './assets/common.css';

// 路由守卫
import './router/permission.js';

Vue.use(ElementUI);
import router from './router';
import store from './store';

import axios from 'axios'
var isPro = process.env.NODE_ENV === 'production';
window.baseUrl = isPro? 'http://localhost:7070/':'/api'
Vue.prototype.$axios = axios

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
