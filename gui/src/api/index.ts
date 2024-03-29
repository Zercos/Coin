import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

import { jsonReviver } from '@/utils/json'
import { mapObjValuesDeep } from '@/utils'
import router from '@/router'

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

function redirectOn401(error) {
  if (error?.response?.status === 401){
    const authStore = useAuthStore()
    authStore.removeUserData()
    router.push({ name: 'Login' })
    return Promise.reject(error)
  }
  return error
}

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 30000,
})

API.defaults.transformResponse = [trsnRes]
API.defaults.transformRequest = [trnsReq]
API.interceptors.request.use(addAuthorizationHeader)
API.interceptors.response.use(resp => (resp), redirectOn401)
