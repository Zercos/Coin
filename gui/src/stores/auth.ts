import { defineStore } from 'pinia'
import type { JwtPayload } from '@/types'
import sessionApi from '@/api/sessions'
import { decodeAuthToken, fmtApiError } from '@/utils'
import { ElMessageBox } from 'element-plus'

import router from '@/router'

const useAuthStore = defineStore('auth', {
  state: () => ({
    authToken: localStorage.getItem('authToken') as string | null,
    tokenPayload: decodeAuthToken(localStorage.getItem('authToken')) as JwtPayload,
  }),
  getters: {
    isLoggedIn: (state) => !!state.authToken,
    sessionId: (state) => state.tokenPayload.jti,
    userName: (state) => state.tokenPayload.ufn,
  },
  actions: {
    removeUserData() {
      localStorage.removeItem('authToken')
      this.$patch({ authToken: null, tokenPayload: {} })
    },
    async login(email: string, password: string) {
      console.debug('Authentication the user ' + email)
      sessionApi
        .login(email, password)
        .then((response) => {
          if (response.status !== 200) {
            ElMessageBox.alert(fmtApiError(response).message, 'Login error')
          } else {
            localStorage.setItem('authToken', response.data.auth_token)
            this.$patch({
              authToken: response.data.auth_token,
              tokenPayload: decodeAuthToken(response.data.auth_token),
            })
            router.push('/')
          }
        })
        .catch((error) => {
          ElMessageBox.alert(fmtApiError(error).message, 'Login error')
        })
    },
    async register(formData: any) {
      console.debug('Register the user')
      sessionApi
        .register(formData)
        .then((response) => {
          if (response.status !== 200) {
            ElMessageBox.alert(fmtApiError(response).message, 'Registration error', { dangerouslyUseHTMLString: true })
          } else {
            localStorage.setItem('authToken', response.data.auth_token)
            this.$patch({
              authToken: response.data.auth_token,
              tokenPayload: decodeAuthToken(response.data.auth_token),
            })
            router.push('/')
          }
        })
        .catch((error) => {
          ElMessageBox.alert(fmtApiError(error).message, 'Registration error', { dangerouslyUseHTMLString: true })
        })
    },
    async logout() {
      this.removeUserData()
    },
  },
})

export default useAuthStore
