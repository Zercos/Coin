<template>
  <div>
    <ul class="sidenav main-sidebar" :class="{ open: value }">
      <router-link
        v-for="link in links"
        :key="link.route"
        active-class="active"
        :to="link.route"
        custom
        v-slot="{ navigate }"
      >
        <li @click="navigate" @keypress.enter="navigate" role="link">
          <a href="#" class="waves-effect waves-orange pointer">{{ link.name }}</a>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script setup lang="ts">

const props = defineProps(['value'])

const links = [
  { name: 'Home', route: '/' },
  { name: 'Categories', route: '/categories' },
]
</script>
