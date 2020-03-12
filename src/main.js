import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from '@/util/messages.plugin'
import 'materialize-css/dist/js/materialize.min'
import dateFilter from '@/util/filters'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(messagePlugin)
Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)

firebase.initializeApp({
  apiKey: 'AIzaSyDU_6I10naR0MywmMw4mraFz55jfvK-Sg8',
  authDomain: 'todo-list-358b0.firebaseapp.com',
  databaseURL: 'https://todo-list-358b0.firebaseio.com',
  projectId: 'todo-list-358b0',
  storageBucket: 'todo-list-358b0.appspot.com',
  messagingSenderId: '957022971550',
  appId: '1:957022971550:web:87035e6c3bf1b8887efd8f',
  measurementId: 'G-BLK1R7HSLJ'
})
let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
