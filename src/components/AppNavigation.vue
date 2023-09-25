<script setup lang="ts">
import { ref, computed } from 'vue'
import logo from '../assets/logo.png'
import { storeToRefs } from 'pinia';
import { useBooksStore } from '@/stores/books';

type NavItem = {
  label: string;
  routeName: string;
}

const applicationName = ref('Bookmonkey API');
const navigation = ref<NavItem[]>([{
  label: 'Books', routeName: 'home',
}, {
  label: 'About', routeName: 'about',
}, {
  label: 'Create', routeName: 'book-create',
}])
const transformedApplicationName = computed(() => applicationName.value.toUpperCase())

const { loadedBooks } = storeToRefs(useBooksStore())
</script>

<template>
  <nav>
    <ul>
      <li>
        <img :src="logo" :alt="transformedApplicationName" width="300" />
        ({{ loadedBooks }})
      </li>
    </ul>
    <ul>
      <li v-for="item in navigation" :key="item.routeName">
        <RouterLink :to="{ name: item.routeName }" exact-active-class="contrast">{{ item.label }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>