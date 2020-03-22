import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    async getCurrency ({ commit }) {
      const key = process.env.VUE_APP_FIXER
      try {
        const response = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&format=1&symbols=USD,EUR,UAH`)
        return response.json()
      } catch (error) {
        commit('setError', error)
      }
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth,
    info
  }
})
