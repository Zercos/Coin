import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import { jsonReviver } from '@/utils/json'
import { mapObjValuesDeep } from '@/utils'
import { useRouter } from 'vue-router'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

import useAuthStore from '@/stores/auth'

function trsnRes(data: any) {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data, jsonReviver)
    } catch (e) {
      console.error('Error transforming response %0', data)
    }
  }
  return data
}

function trnsReq(data, headers): any {
  if (_.isPlainObject(data)) {
    data = mapObjValuesDeep(data, (v) => {
      if (v === undefined) {
        return null
      } else if (moment.isMoment(v)) {
        return v.format('YYYY-MM-DDTHH:mm:ss')
      }
      return v
    })
    headers['Content-Type'] = 'application/json;charset=utf-8'
    return JSON.stringify(data)
  }
  return data
}

function addAuthorizationHeader(config: AxiosRequestConfig) {
  const authStore = useAuthStore()
  if (authStore.authToken) {
    config!.headers!.common['Authorization'] = 'Bearer ' + window.btoa(authStore.authToken)
  }
  return config
}

function redirectOn401(response: AxiosResponse) {
  if (response.status === 401){
    const authStore = useAuthStore()
    authStore.removeUserData()
    const router = useRouter()
    router.push({ name: 'Login' })
    return Promise.reject(response)
  }
  return response
}

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 30000,
})

API.defaults.transformResponse = [trsnRes]
API.defaults.transformRequest = [trnsReq]
API.interceptors.request.use(addAuthorizationHeader)
API.interceptors.response.use(redirectOn401)
