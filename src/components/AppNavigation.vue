<script setup lang="ts">
import { ref, computed } from 'vue'
import logo from '../assets/logo.png'

type NavItem = {
  label: string;
  routeName: string;
}

const applicationName = ref('Bookmonkey API');
const navigation = ref<NavItem[]>([{
  label: 'Books', routeName: 'home',
}, {
  label: 'About', routeName: 'about',
}])
const transformedApplicationName = computed(() => applicationName.value.toUpperCase())
</script>

<template>
  <nav>
    <ul>
      <li>
        <img :src="logo" :alt="transformedApplicationName" width="300" />
      </li>
    </ul>
    <ul>
      <li v-for="item in navigation" :key="item.routeName">
        <RouterLink :to="{ name: item.routeName }" exact-active-class="is-active">{{ item.label }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style>
.is-active {
  color: white;
  background-color: var(--primary);
  padding: var(--form-element-spacing-vertical) var(--form-element-spacing-horizontal);
  border-radius: var(--border-radius);
}
</style>