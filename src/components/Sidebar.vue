<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      :to="link.url"
      active-class="active"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>
<script>
export default {
  name: 'sidebar',
  props: ['value'],
  data: function () {
    return {
      links: [
        { title: 'Bill', url: '/', exact: true },
        { title: 'History', url: '/history' },
        { title: 'Planning', url: '/planning' },
        { title: 'New entry', url: '/record' },
        { title: 'Categories', url: '/categories' }
      ]
    }
  }
}
</script>
