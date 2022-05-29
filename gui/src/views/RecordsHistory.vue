<template>
  <div v-loading>
    <div class="page-title" style="margin-bottom: 0">
      <h3>Records History</h3>
    </div>
    <el-divider />
    <RecordEdit
      v-if="showEditForm"
      v-model="showEditForm"
      @record-updated="recordUpdated"
      :row-data="recordUpdate"
      :categories="categories"
    />
    <el-table :data="currentRecords" stripe>
      <el-table-column prop="id" label="#" />
      <el-table-column prop="amount" label="Amount" />
      <el-table-column prop="description" label="Description" />
      <el-table-column prop="type" label="Type">
        <template #default="scope">
          <el-tag effect="dark" round :type="scope.row.type == 'income' ? 'success' : 'warning'">{{
            scope.row.type == 'income' ? 'Income' : 'Outcome'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="Category" />
      <el-table-column prop="creation_date" label="Creating date">
        <template #default="scope">
          {{ scope.row.creation_date ? scope.row.creation_date.format('DD-MM-YYYY H:mm') : '' }}
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-button @click="fetchRecords" :icon="Refresh" circle />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="currentPage"
      background
      layout="prev, pager, next"
      :total="records.length"
      :page-size="pageSize"
    />
  </div>
</template>
<script setup lang="ts">
import _ from 'lodash'
import { computed, ref, onMounted, nextTick } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import { useRecordsStore } from '@/stores/records'
import { ElMessageBox } from 'element-plus'
import { fmtApiError } from '@/utils'
import RecordEdit from '@/components/RecordEdit.vue'
import { useCategoriesStore } from '@/stores/categories'

const recordsStore = useRecordsStore()
const categoriesStore = useCategoriesStore()

let loading = ref(false)
let showEditForm = ref(false)
let recordUpdate = ref({})
const currentPage = ref(1)
const pageSize = 10
const records = computed(() => recordsStore.records)
const allRecords = computed(() => _.chunk(records.value, pageSize))
const currentRecords = computed(() => allRecords.value[currentPage.value-1] || allRecords.value[0])
const categories = computed(() => categoriesStore.activeCategories)

onMounted(() => {
  fetchCategories()
  fetchRecords()
})

function fetchRecords() {
  loading.value = true
  recordsStore
    .fetchRecords()
    .then(() => {
      loading.value = false
    })
    .catch((error) => {
      loading.value = false
      ElMessageBox.alert(fmtApiError(error).message, 'Records fetch error')
    })
}

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

function recordUpdated() {
  showEditForm.value = false
  recordUpdate.value = {}
  fetchRecords()
}

function handleEdit(index, row) {
  let rowData = {
    description: row.description,
    id: row.id,
    type: row.type,
    amount: row.amount,
    category: row.category_id,
  }
  recordUpdate.value = rowData
  nextTick(() => {
    showEditForm.value = true
  })
}
</script>
