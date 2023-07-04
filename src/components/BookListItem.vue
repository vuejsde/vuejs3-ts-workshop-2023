<script setup lang="ts">
import { ref } from 'vue'
import ConfirmationDialog from './ConfirmationDialog.vue';
import type { Book } from '../types';

type Props = {
  title: Book['title'];
  isbn: Book['isbn'];
  numPages?: Book['numPages'];
  cover?: Book['cover'];
  read?: boolean;
}

defineProps<Props>()

const emit = defineEmits(['read'])

function readBook() {
  closeDialog()
  emit('read')
}

const dialogIsVisible = ref(false)

function openDialog() {
  dialogIsVisible.value = true
}

function closeDialog() {
  dialogIsVisible.value = false
}
</script>

<template>
  <tr>
    <td>
      <RouterLink :to="{ name: 'book-detail', params: { isbn } }">{{ isbn }}</RouterLink>
    </td>
    <td>{{ title }}</td>
    <td>{{ numPages }}</td>
    <td><img :src="cover" width="100" /></td>
    <td><button @click="openDialog" :disabled="read">
        <span v-if="read">✅</span>
        <span v-else>Read</span>
      </button></td>
  </tr>
  <ConfirmationDialog :show="dialogIsVisible" @cancel="closeDialog" @confirm="readBook">
    <template #header>
      Confirm read action
    </template>
    <template #body>
      Do you really want to mark the book '{{ title }}' as read?
    </template>
  </ConfirmationDialog>
</template>