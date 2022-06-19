<template>
  <div v-loading="loading">
    <div class="page-title">
      <h3>My categories planning</h3>
    </div>
    <p class="center" v-if="!categories.length">
      No active categories
      <router-link to="/categories">Add category</router-link>
    </p>
    <div v-else>
      <CategoriesPlanning :categoriesForPlanning="categoriesForPlanning" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useCategoriesStore } from '@/stores/categories'
import { useRecordsStore } from '@/stores/records'
import { fmtApiError } from '@/utils'
import CategoriesPlanning from '@/components/CategoriesPlanning.vue'

let loading = ref(false)
const categoriesStore = useCategoriesStore()
const recordsStore = useRecordsStore()
const records = computed(() => recordsStore.records)
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
