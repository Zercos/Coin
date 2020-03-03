<template>
  <div class="app-main-layout">
    <navbar @hide-navbar="sidebarIsOpen = !sidebarIsOpen" />
    <sidebar v-model="sidebarIsOpen" />

    <main class="app-content" :class="{full: !sidebarIsOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  components: {
    Navbar,
    Sidebar
  },
  data: function () {
    return {
      sidebarIsOpen: true
    }
  }
}
</script>
