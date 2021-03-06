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
    async createCategory ({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit })
        return { title, limit, id: category.key }
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async getCategories ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const categories = (await firebase.database().ref(`users/${uid}/categories`).once('value')).val()
        return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
      } catch (error) {}
    },
    async editCategory ({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  },
  getters: {
    info: s => s.info
  }
}
