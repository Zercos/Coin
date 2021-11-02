import firebase from 'firebase/app'

export default {
  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async logout ({ commit }) {
      await firebase.auth().signOut()
      commit('clearInfo')
    },
    async register ({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`users/${uid}/info`).set({
          name: name,
          bill: 0
        })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    getUid () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    }
  }
}
