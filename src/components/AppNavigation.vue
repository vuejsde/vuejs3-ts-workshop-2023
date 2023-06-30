<script setup lang="ts">
import { ref } from 'vue'

type NavItem = {
  label: string;
  link: string;
}

const applicationName = ref('Bookmonkey API');
const navigation = ref<NavItem[]>([{
  label: 'Books', link: '/books',
}, {
  label: 'About', link: '/about',
}, {
  label: 'Login', link: '/login'
}])
</script>

<template>
  <nav>
    <ul>
      <li><strong>{{ applicationName.toUpperCase() }}</strong></li>
    </ul>
    <ul>
      <li><a href="#">{{ navigation[0].label }}</a></li>
      <li><a href="#">{{ navigation[1].label }}</a></li>
      <li><a href="#" role="button">{{ navigation[2].label }}</a></li>
    </ul>
  </nav>
</template>