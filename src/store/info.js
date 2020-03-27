import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    clearInfo (state) {
      state.info = {}
    }
  },
  actions: {
    async getInfo ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('setInfo', info)
      } catch (error) {
        commit('setError', error)
      }
    },
    async createCategory ({ commit, dispatch }, categoryData) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`users/${uid}/info`).set(categoryData)
      } catch (error) {
        commit('setError', error)
      }
    }
  },
  getters: {
    info: s => s.info
  }
}
