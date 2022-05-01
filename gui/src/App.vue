<script setup lang="ts">
import { computed } from 'vue'

import NotLoggedInLayout from '@/components/layout/NotLoggedInLayout.vue'
import LoggedInLayout from '@/components/layout/LoggedInLayout.vue'
import useAuthStore from './stores/auth'

const authStore = useAuthStore()

const isLoggedIn = computed(() => authStore.isLoggedIn)

</script>

<template>
  <component :is="isLoggedIn ? LoggedInLayout : NotLoggedInLayout">
    <router-view />
  </component>
</template>

<style>
@import "materialize-css/dist/css/materialize.min.css";
@import "element-plus/dist/index.css";
@import "assets/index.css";
</style>
