<template>
  <div class="home">
    <div>
      <div class="page-title">
        <h3>Current bill</h3>

        <button class="btn waves-effect waves-light btn-small" @click="refresh">
          <i class="material-icons">refresh</i>
        </button>
      </div>
      <div class="row" v-loading="loading">
        <div class="col s12 m6 l4">
          <el-card>
            <h6>Your current bill is:</h6>
            <h2>{{ fmtCurrency(currentBill) }}</h2>
          </el-card>
        </div>
        <div class="col s12 m6 l4">
          <CategoriesPlanning :categoriesForPlanning="categoriesForPlanning" header="Categories planning" />
        </div>
        <!-- <home-currency :rates="currency.rates" :date="currency.date" /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import { fmtApiError, fmtCurrency } from '@/utils'
import { useRecordsStore } from '@/stores/records'
import { useCategoriesStore } from '@/stores/categories'
import CategoriesPlanning from '@/components/CategoriesPlanning.vue'

const loading = ref(false)
const recordsStore = useRecordsStore()
const categoriesStore = useCategoriesStore()

const currentBill = computed(() => recordsStore.currentBill)
const categories = computed(() => categoriesStore.activeCategories)
const records = computed(() => recordsStore.records)

function refresh() {
  loadCategories()
  fetchCurrentBill()
}

onMounted(() => {
  loadCategories()
  fetchCurrentBill()
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

function fetchCurrentBill() {
  loading.value = true
  recordsStore
    .fetchBillInfo()
    .then(() => {
      loading.value = false
    })
    .catch((error) => {
      loading.value = false
      ElMessageBox.alert(fmtApiError(error).message, 'Records fetch error')
    })
}

function loadCategories() {
  loading.value = true
  categoriesStore
    .loadCategories()
    .then(() => {
      loading.value = false
    })
    .catch((error) => {
      loading.value = false
      ElMessageBox.alert(fmtApiError(error).message, 'Categoeis fetch error')
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
