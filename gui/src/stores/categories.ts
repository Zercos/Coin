import { defineStore } from 'pinia'
import categoriesAPI from '@/api/categories'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: []
  }),
  getters: {
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
    modifyCategory(categoryId, formData) {}
  }
})
