import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from '@/util/messages.plugin'
import config from '@/config'
import 'materialize-css/dist/js/materialize.min'
import { dateFilter, moneyFilter } from '@/util/filters'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import Loader from '@/components/Loader'

// Vue use
Vue.use(messagePlugin)
Vue.use(Vuelidate)

// Vue filters
Vue.filter('fmtDate', dateFilter)
Vue.filter('fmtMoney', moneyFilter)

Vue.config.productionTip = false
Vue.component('loader', Loader)

firebase.initializeApp(config)
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
