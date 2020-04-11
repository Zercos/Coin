<template>
  <div>
    <div class="page-title">
      <h3>Categories</h3>
    </div>
    <section>
      <div class="row">
        <category-create @created="addNewCategory" />
        <loader v-if="loading" />
        <div v-else>
          <category-edit
          v-if="categories.length"
          :key="categories.length + editCount"
          :categories="categories"
        />
        <p v-else>No categories to edit</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  name: 'categories',
  components: {
    CategoryCreate,
    CategoryEdit
  },
  data: () => ({
    loading: true,
    categories: [],
    editCount: 0
  }),
  async created () {
    this.categories = await this.$store.dispatch('getCategories')
    this.loading = false
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
    }
  }
}
</script>
