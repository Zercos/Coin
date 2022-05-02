<template>
  <div v-loading="loading">
    <el-row>
      <el-col :span="16">
        <div class="page-title" style="margin-bottom: 0">
          <h3>Categories</h3>
        </div>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" size="large" style="float: right" @click="showNewCategoryForm = true">
          Add new
        </el-button>
      </el-col>
    </el-row>
    <NewCategory v-if="showNewCategoryForm" v-model="showNewCategoryForm" @category-created="categoryCreated" />
    <CategoryEdit
      v-if="showEditCategoryForm"
      v-model="showEditCategoryForm"
      @category-updated="categoryUpdated"
      :row-data="categoryUpdate"
    />

    <el-divider />

    <el-table :data="categories" stripe>
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="limit" label="Limit" />
      <el-table-column prop="description" label="Description" />
      <el-table-column prop="active" label="Active" />
      <el-table-column prop="creation_date" label="Creating date">
        <template #default="scope">{{
          scope.row.creation_date ? scope.row.creation_date.format('DD-MM-YYYY H:mm') : ''
        }}</template>
      </el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-button @click="fetchCategories" :icon="Refresh" circle />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'
import { ElMessageBox } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import { fmtApiError } from '@/utils'
import { useCategoriesStore } from '@/stores/categories'
import NewCategory from '@/components/NewCategory.vue'
import CategoryEdit from '@/components/CategoryEdit.vue'

const categoriesStore = useCategoriesStore()

const categories = computed(() => categoriesStore.categories)
let showNewCategoryForm = ref(false)
let showEditCategoryForm = ref(false)
let loading = ref(false)
let categoryUpdate = ref({})

function fetchCategories() {
  loading.value = true
  categoriesStore
    .fetchCategories()
    .then(() => {
      loading.value = false
    })
    .catch((error) => {
      loading.value = false
      ElMessageBox.alert(fmtApiError(error).message, 'Categories fetch')
    })
}

function categoryCreated() {
  showNewCategoryForm.value = false
  fetchCategories()
}
function categoryUpdated() {
  showEditCategoryForm.value = false
  categoryUpdate.value = {}
  fetchCategories()
}

function handleEdit(index, row) {
  let rowData = { name: row.name, limit: row.limit, description: row.description, active: row.active, id: row.id }
  categoryUpdate.value = rowData
  nextTick(() => {
    showEditCategoryForm.value = true
  })
}

onMounted(() => {
  fetchCategories()
})
</script>
