<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { computed } from 'vue'

import Layout from '@/components/layout/Layout.vue'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

const isLoggedIn = computed(() => authStore.isLoggedIn)
const layoutView = computed(() => isLoggedIn.value ? 'AuthLayout' : 'Layout' )

</script>

<template>
  <component :is="layoutView">
    <RouterView />
  </component>
</template>

<style>
@import "materialize-css/dist/css/materialize.min.css";
@import "element-plus/dist/index.css";
@import "assets/index.css";
</style>
