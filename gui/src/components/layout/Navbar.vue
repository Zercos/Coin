<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('toggle')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ dateNow }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a class="dropdown-trigger black-text" href="#" data-target="dropdown" ref="dropdown">
            {{ userName }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>
                Profile
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>
                Sign out
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import type { Ref } from 'vue'
import M from 'materialize-css'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const loading = ref(true)
const dropdown: Ref<Element | undefined> = ref()
const MDropdown = ref()
const interval = ref()
const dateNow = ref(new Date())

const userName = computed(() => authStore.userName)

onMounted(() => {
  interval.value = setInterval(() => {
    dateNow.value = new Date()
  }, 1000)
  MDropdown.value = M.Dropdown.init(dropdown.value as Element, { constrainWidth: false })
})

onBeforeUnmount(() => {
  clearInterval(interval.value)
  if (MDropdown.value && MDropdown.value.destroy) {
    MDropdown.value.destroy()
  }
})

setTimeout(() => {
  loading.value = false
}, 3000)

async function logout() {
  await authStore.logout()
  router.push({ name: 'Login' })
}
</script>
