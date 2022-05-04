import { API } from './index'

export default {
  createRecord(formData) {
    return API.post('records', formData)
  },
  getRecords() {
    return API.get('records')
  },
  modifyRecord(recordId: number, formData) {
    return API.put('record/' + recordId, formData)
  }
}
