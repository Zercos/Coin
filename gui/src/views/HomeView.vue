<template>
  <div class="home">
    <div>
      <div class="page-title">
        <h3>Bill</h3>

        <button class="btn waves-effect waves-light btn-small" @click="refresh">
          <i class="material-icons">refresh</i>
        </button>
      </div>
      <div class="row" v-loading="loading">
        <!-- <home-bill :rates="currency.rates" />
        <home-currency :rates="currency.rates" :date="currency.date" /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)

function refresh() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 3000)
}
</script>
