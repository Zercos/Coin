import { defineStore } from 'pinia'
import type { Moment } from 'moment'
import recordsAPI from '@/api/records'

export interface IRecord {
  id: number
  amount: number
  description: string
  removed: boolean
  category_id: number
  type: string
  user_id: number
  creation_date: Moment
  created_by: number
  updated_by?: number
  update_date?: Moment
}

export const useRecordsStore = defineStore('records', {
  state: () => ({
    records: [] as IRecord[]
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
