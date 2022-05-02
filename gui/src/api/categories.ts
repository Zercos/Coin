import { API } from './index'

export default {
  createCategory(formData) {
    return API.post('categories', formData)
  },
  getCategories() {
    return API.get('categories')
  },
  modifyCategory(categoryId: number, formData) {
    return API.put('category/' + categoryId, formData)
  }
}
