/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-25 23:35:45
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-12-16 00:33:11
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
    myRole: null
  },
  mutations: {
    saveMyRole(state,data){
      state.myRole = data;
    },
    saveUserInfo(state,data){
      state.userInfo = data;
    }
  },
  actions: {
  },
  modules: {
  },
});
