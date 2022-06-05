import _ from 'lodash'
import jwtDecode from 'jwt-decode'
import type { JwtPayload } from '@/types'


export function mapObjValuesDeep(obj: any, fn: any) {
  if (!_.isObject(obj)) throw Error('Function can accept only object')

  const mapper = (val, key, parent) => {
    if (_.isPlainObject(val)) {
      return _.mapValues(val, mapper)
    } else if (_.isArray(val)) {
      return _.map(val, mapper)
    } else {
      return fn(val, key, parent)
    }
  }

  return _.mapValues(obj, mapper)
}

export function fmtApiError(error) {
  function recGetErrors(retErrors, baseName, source) {
    if (_.isArray(source)) {
      _.forEach(source, (msg) => {
        retErrors.push('<li>' + msg + '</li>')
      })
    } else {
      _.forOwn(source, (value, key) => {
        const newName = baseName ? baseName + '.' + key : key
        if (_.isPlainObject(value)) {
          recGetErrors(retErrors, newName, value)
        } else {
          _.forEach(value, (msg) => {
            retErrors.push('<li><strong>' + newName + '</strong>: ' + msg + '</li>')
          })
        }
      })
    }
  }
  if (error.response) {
    const response = error.response
    const data = response.data || { errors: null, message: null }
    let message = ''
    const errors: Array<string> = []

    if (data.errors) {
      if (_.isArray(data.errors) || _.isPlainObject(data.errors)) {
        recGetErrors(errors, undefined, data.errors)
      } else if (_.isString(data.errors)) {
        errors.push('<li>' + data.errors + '</li>')
      }
    } else if (_.isObject(data.message)) {
      for (const field in data.message) { errors.push('<li>' + data.message[field] + '</li>') }
    } else if (_.isString(data.message)) {
      message = data.message
    }
    if (errors.length) {
      message = '<p>' + message + '</p>'
      message += '<ul>' + errors.join('') + '</ul>'
    }
    return { title: 'Error', message: message }
  } else {
    if (error.message) {
      return { title: 'Error', message: error.message }
    } else {
      let message
      try {
        message = JSON.stringify(error)
      } catch (e) {
        message = 'The error message could not be determined'
      }
      return { title: 'Error', message: message }
    }
  }
}


export function decodeAuthToken(token?: string | null): JwtPayload {
  if (token) {
    return jwtDecode<JwtPayload>(token)
  } else {
    return {}
  }
}

export function fmtDatetime(value: any): string {
  // const options = {day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'}
  return new Intl.DateTimeFormat('en', { dateStyle: 'full' }).format(new Date(value))
}

export function fmtCurrency(value?: number): string {
  if (!value) return ''
  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(value)
}
