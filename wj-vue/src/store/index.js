import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
    return response;
  },
  function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  try {
    console.log(error.response.data)
    alert(error.response.data["message"])
  } catch (error) {
    alert('未知错误')
  }
  // return Promise.reject(error);
});

export default new Vuex.Store({
  state: {
    login: false,
    username: function(){
      console.log(window.localStorage.getItem('username'))
      if (window.localStorage.getItem('username') ==='undefined'||
          window.localStorage.getItem('username')==null) {
        return ''
      } else {
        return JSON.parse(window.localStorage.getItem('usdername' || '[]'))
      }
    }(),
    adminMenus: []
  },
  mutations: {
    initAdminMenu (state, menus) {
      state.adminMenus = menus
    },
    login (state, data) {
      state.login = true
      state.username = data
      window.localStorage.setItem('username', data)
      
      var access_token = window.localStorage.getItem('access')
      axios.defaults.headers.common['Authorization'] = 'Bearer '+access_token
    },
    logout (state) {
      state.login = false
      
      // // 注意不能用 null 清除，否则将无法判断 user 里具体的内容
      // state.username = ''
      // window.localStorage.removeItem('username')
      // state.adminMenus = []
    }
  },
  actions: {
  }
})
