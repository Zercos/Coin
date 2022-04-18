import { defineStore } from 'pinia'
import type { JwtPayload } from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    jwt: localStorage.getItem('jwt') as JwtPayload | null
  }),
  getters: {
    isLoggedIn: (state) => !!state.jwt,
    userName: (state) => 'User name',
  },
  actions: {
    async login(email: string, password: string) {
      console.log({ email, password })
      this.jwt = {iss: 'a'}
    },
    async register(formData: any) {
      console.log(`Register ${formData}`)
    },
    async logout(){
      console.log('Logout user')
    }
  },
})
