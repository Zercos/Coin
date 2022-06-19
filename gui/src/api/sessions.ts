import { API } from './index'

export default {
  login(login: string, password: string) {
    return API.post('login', { login: login, password: password })
  },
  logout(sessionId: string) {
    return API.delete('logout/' + sessionId)
  },
  register(formData) {
    return API.post('register', formData)
  }
}
