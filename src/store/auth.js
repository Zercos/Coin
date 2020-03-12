import firebase from 'firebase/app'

export default {
  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    }
  }
}
