<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { defineComponent } from 'vue'
import AuthLayout from '@/layouts/AuthLayout'
import Layout from '@/layouts/Layout'

export default defineComponent({
  components: {
    AuthLayout,
    Layout
  },
  computed: {
    layout () {
      return this.$store.getters.isLoggedIn ? 'layout' : 'auth-layout'
    }
  },
  watch: {
    '$route' (to, from) {
      document.title = to.meta.title || 'Your Coin'
    }
  }
})
</script>


<style>
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
