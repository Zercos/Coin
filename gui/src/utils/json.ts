import moment from 'moment'

export const datetimeFormat = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/
export const dateFormat = /\d{4}-[01]\d-[0-3]\d/
export const timeFormat = /[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/

export function jsonReviver(key: string, value: any): any {
  if (value && typeof value === 'string' && (datetimeFormat.test(value) || dateFormat.test(value))) {
    return moment(value)
  } else if (value && typeof value === 'string' && timeFormat.test(value)) {
    return moment(value, 'HH:mm:ss.SSSS')
  } else {
    return value
  }
}
