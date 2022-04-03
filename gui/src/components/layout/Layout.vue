<template>
  <div class="app-main-layout">
    <!-- <navbar @hide-navbar="sidebarIsOpen = !sidebarIsOpen" />
    <sidebar v-model="sidebarIsOpen" /> -->

    <main class="app-content" :class="{full: !sidebarIsOpen}">
      <div class="app-page" v-loading.fullscreen.lock=loading>
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

const loading = ref(true)
const sidebarIsOpen = false

setTimeout(() => {
  loading.value = false
}, 3000)
</script>
