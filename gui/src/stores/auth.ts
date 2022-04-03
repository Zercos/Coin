import { defineStore } from 'pinia'
import type { JwtPayload } from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    jwt: localStorage.getItem('jwt') as JwtPayload | null
  }),
  getters: {
    isLoggedIn: (state) => !!state.jwt
  },
  actions: {
  }
})
