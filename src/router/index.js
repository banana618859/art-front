/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-25 23:35:45
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-10-31 10:48:06
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import User from '../components/User.vue';
import UserEdit from '../components/UserEdit.vue';

import Role from '../components/Role.vue';
import Right from '../components/Right.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/user',
        name:'User',
        component: User
      },
      {
        path:'/userEdit',
        name:'userEdit',
        component: UserEdit
      },
      {
        path:'/role',
        name:'Role',
        component: Role
      },
      {
        path:'/right',
        name:'Right',
        component: Right
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
