<script setup lang="ts">
type Props = {
  title: string;
  isbn: string;
  numPages?: number;
  cover?: string;
}

defineProps<Props>()
</script>

<template>
  <tr>
    <td>{{ isbn }}</td>
    <td>{{ title }}</td>
    <td>{{ numPages }}</td>
    <td><img :src="cover" width="100" /></td>
  </tr>
</template>