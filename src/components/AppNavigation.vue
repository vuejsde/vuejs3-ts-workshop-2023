<script setup lang="ts">
import { ref, computed } from 'vue'
import logo from '../assets/logo.png'
import { storeToRefs } from 'pinia';
import { useBooksStore } from '@/stores/books';
import { useAuthStore } from '@/stores/auth';

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
const auth = useAuthStore()
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
      <li v-if="auth.isAuthenticated">
        <a href="#" role="button" class="contrast">{{ auth.username }}</a>
      </li>
    </ul>
  </nav>
</template>