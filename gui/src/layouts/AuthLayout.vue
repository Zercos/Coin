<template>
  <div class="cyan darken-4 auth-layout">
    <router-view />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
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
