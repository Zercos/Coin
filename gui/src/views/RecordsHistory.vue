<template>
  <div v-loading>
    <div class="page-title" style="margin-bottom: 0">
      <h3>Records History</h3>
    </div>
    <el-divider />
    <el-table :data="records" stripe>
      <el-table-column prop="id" label="#" />
      <el-table-column prop="amount" label="Amount" />
      <el-table-column prop="description" label="Description" />
      <el-table-column prop="type" label="Type" />
      <el-table-column prop="category" label="Category" />
      <el-table-column prop="creation_date" label="Creating date">
        <template #default="scope">{{
          scope.row.creation_date ? scope.row.creation_date.format('DD-MM-YYYY H:mm') : ''
        }}</template>
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
  </div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import { useRecordsStore } from '@/stores/records'
import { ElMessageBox } from 'element-plus';
import { fmtApiError } from '@/utils';

const recordsStore = useRecordsStore()

let loading = ref(false)
const records = computed(() => recordsStore.records)

onMounted(() => {
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
function handleEdit(index, row) {}
</script>
