<template>
  <el-card :header="header">
    <div v-for="cat of categoriesForPlanning" :key="cat.id">
      <p>
        <strong>{{ cat.name }}:</strong>
        {{ cat.spend }} {{ 'Of' }} {{ cat.limit }}
      </p>
      <el-tooltip :content="cat.tooltip" placement="bottom">
        <el-progress :text-inside="true" :stroke-width="26" :percentage="cat.progressPercent" :color="colors" />
      </el-tooltip>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import type { IPlanCategory } from '@/types'

defineProps<{
  categoriesForPlanning: IPlanCategory[]
  header?: string
}>()

const colors = [
  { color: 'green', percentage: 60 },
  { color: '#e6ca3c', percentage: 95 },
  { color: 'red', percentage: 100 },
]
</script>
