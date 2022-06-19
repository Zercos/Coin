import { defineStore } from 'pinia'
import type { Moment } from 'moment'
import categoriesAPI from '@/api/categories'
import type { ICategory } from '@/types'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [] as ICategory[]
  }),
  getters: {
    activeCategories: (state) => (state.categories ? state.categories.filter(cat => cat['active']) : [])
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
    },
    loadCategories(): Promise<void> {
      if (this.categories) return Promise.resolve()
      return this.fetchCategories()
    }
  }
})
