import { register } from 'register-service-worker'
import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn: localStorage.getItem('isLoogedIn') === 'true' ? true : false,
    token: '',
    sessionId: ''
  },
  getters: {
    isLoggedIn: s => s.isLoggedIn
  },
  mutations: {
    setAuthData (state, authData) {
      state.isLoggedIn = true
      localStorage.setItem('isLoogedIn', 'true')
    },
    logout (state) {
      state.isLoggedIn = false
      localStorage.removeItem('isLoogedIn')
    }
  },
  actions: {
    async login ({ commit }, { email, password }) {
      try {
        console.log('Logged in')
        commit('setAuthData', {})
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    async logout ({ commit }) {
      commit('logout')
    },
    async register({ commit }, data) {
      console.log('Register user')
      commit('setAuthData', {})
    }
  },
  modules: {
  }
})
