import { defineStore } from 'pinia'
import recordsAPI from '@/api/records'

export const useRecordsStore = defineStore('records', {
  state: () => ({
    records: []
  }),
  getters: {
  },
  actions: {
    fetchRecords(): Promise<void> {
      return recordsAPI.getRecords().then(response => {
        if (response.status !== 200) Promise.reject()
        this.records = response.data
      })
    },
    createRecord(formData): Promise<void> {
      return recordsAPI.createRecord(formData).then(response => {
        if (![200, 201].includes(response.status)) {
          return Promise.reject(response)
        }
      })
    },
    modifyRecord(recordId, formData): Promise<void> {
      return recordsAPI.modifyRecord(recordId, formData).then(response => {
        if (response.status !== 200) Promise.reject()
      })
    }
  }
})
