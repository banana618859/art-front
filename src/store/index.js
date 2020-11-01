/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-25 23:35:45
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-10-31 18:22:08
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null
  },
  mutations: {
    saveUserInfo(state,data){
      state.userInfo = data;
    }
  },
  actions: {
  },
  modules: {
  },
});
