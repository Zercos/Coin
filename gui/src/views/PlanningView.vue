<template>
  <div v-loading="loading">
    <div class="page-title">
      <h3>Planning</h3>
    </div>
    <p class="center" v-if="!categories.length">
      No active categories
      <router-link to="/categories">Add category</router-link>
    </p>
    <div v-else>
      <div v-for="cat of categoriesForPlanning" :key="cat.id">
        <p>
          <strong>{{ cat.name }}:</strong>
          {{ cat.spend }} {{ 'Of' }} {{ cat.limit }}
        </p>
        <el-tooltip :content="cat.tooltip" placement="bottom">
          <el-progress :text-inside="true" :stroke-width="26" :percentage="cat.progressPercent" :color="colors" />
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useCategoriesStore } from '@/stores/categories'
import { useRecordsStore } from '@/stores/records'
import { fmtApiError } from '@/utils'

let loading = ref(false)
const categoriesStore = useCategoriesStore()
const recordsStore = useRecordsStore()
const records = computed(() => recordsStore.records)
const categories = computed(() => categoriesStore.activeCategories)
const colors = [
  { color: 'green', percentage: 60 },
  { color: '#e6ca3c', percentage: 95 },
  { color: 'red', percentage: 100 },
]

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

const categoriesForPlanning = computed(() => {
  return categories.value.map((cat) => {
    const spend = records.value
      .filter((r) => r.category_id === cat.id)
      .filter((r) => r.type === 'outcome')
      .reduce((total, record) => {
        return (total += +record.amount)
      }, 0)
    const percent = Math.round((100 * spend) / cat.limit)
    const progressPercent = percent > 100 ? 100 : percent
    const tooltipValue = cat.limit - spend
    const tooltip = `${tooltipValue < 0 ? 'More Than' : 'Left'} ${Math.abs(tooltipValue)}`
    return {
      ...cat,
      progressPercent,
      spend,
      tooltip,
    }
  })
})
</script>
