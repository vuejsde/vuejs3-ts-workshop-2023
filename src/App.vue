<script setup lang="ts">
import AppNavigation from './components/AppNavigation.vue'
</script>

<template>
  <AppNavigation />
  <RouterView />
</template>

<style>
.is-active {
  color: white;
  background-color: var(--primary);
  padding: var(--form-element-spacing-vertical) var(--form-element-spacing-horizontal);
  border-radius: var(--border-radius);
}
</style>