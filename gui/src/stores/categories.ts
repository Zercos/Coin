import { defineStore } from 'pinia'
import type { Moment } from 'moment'
import categoriesAPI from '@/api/categories'

interface ICategory {
  id: number
  name: string
  limit: number
  description?: string
  creation_date: Moment
  active: boolean
}

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [] as ICategory[]
  }),
  getters: {
    activeCategories: (state) => (state.categories.filter(cat => cat['active']  ))
  },
  actions: {
    fetchCategories(): Promise<void> {
      return categoriesAPI.getCategories().then(response => {
        if (response.status !== 200) Promise.reject()
        this.categories = response.data
      })
    },
    createCategory(formData): Promise<void> {
      return categoriesAPI.createCategory(formData).then(response => {
        if ([200, 201].includes(response.status)) Promise.reject()
      })
    },
    modifyCategory(categoryId, formData): Promise<void> {
      return categoriesAPI.modifyCategory(categoryId, formData).then(response => {
        if (response.status !== 200) Promise.reject()
      })
    }
  }
})