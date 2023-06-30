<script setup lang="ts">
import { ref } from 'vue'
import logo from '../assets/logo.png'

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
      <li>
        <img :src="logo" :alt="applicationName.toUpperCase()" width="300" />
      </li>
    </ul>
    <ul>
      <li v-for="item in navigation" :key="item.link"><a :href="item.link">{{ item.label }}</a></li>
    </ul>
  </nav>
</template>