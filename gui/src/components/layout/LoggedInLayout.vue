<template>
  <div class="app-main-layout" v-loading.fullscreen.lock=loading>
    <navbar @toggle="sidebarIsOpen = !sidebarIsOpen" />
    <MainSidebar :value="sidebarIsOpen" />

    <main class="app-content" :class="{full: !sidebarIsOpen}">
      <div class="app-page">
          <router-view />
      </div>
    </main>

    <!-- <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import MainSidebar from './MainSidebar.vue'

const loading = ref(true)
const sidebarIsOpen = ref(true)

setTimeout(() => {
  loading.value = false
}, 1000)
</script>
