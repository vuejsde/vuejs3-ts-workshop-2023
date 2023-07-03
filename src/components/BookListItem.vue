<script setup lang="ts">
type Props = {
  title: string;
  isbn: string;
  numPages?: number;
  cover?: string;
  read?: boolean;
}

defineProps<Props>()

const emit = defineEmits(['read'])

function readBook() {
  emit('read')
}
</script>

<template>
  <tr>
    <td>{{ isbn }}</td>
    <td>{{ title }}</td>
    <td>{{ numPages }}</td>
    <td><img :src="cover" width="100" /></td>
    <td><button @click="readBook" :disabled="read">
        <span v-if="read">✅</span>
        <span v-else>Read</span>
      </button></td>
  </tr>
</template>