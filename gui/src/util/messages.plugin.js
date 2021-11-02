import M from 'materialize-css'
export default {
  install (Vue, options) {
    Vue.prototype.$message = function (text) {
      M.toast({ html: text })
    }

    Vue.prototype.$error = function (text) {
      M.toast({ html: '<span class="red-text">[Error] ' + text + '<span>' })
    }
  }
}
