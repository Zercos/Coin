<template>
  <div class="app-main-layout">
    <!-- <navbar @hide-navbar="sidebarIsOpen = !sidebarIsOpen" />
    <sidebar v-model="sidebarIsOpen" /> -->

    <main class="app-content" :class="{full: !sidebarIsOpen}">
      <div class="app-page">
        <loader v-if="loading" />
        <div v-else>
          <router-view />
        </div>
      </div>
    </main>

    <!-- <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div> -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'
// import Navbar from '@/components/Navbar.vue'
// import Sidebar from '@/components/Sidebar.vue'
export default defineComponent({
  components: {
  },
  data: function () {
    return {
      sidebarIsOpen: true,
      loading: true
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('getInfo')
    }
    this.loading = false
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbError) {
      this.$error(fbError.message)
    }
  }
})
</script>
