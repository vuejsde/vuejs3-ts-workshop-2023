<script setup lang="ts">
import type { Book } from '@/types/book'

type Props = {
  book: Book
}

defineProps<Props>()
</script>

<template>
  <tr>
    <td>{{ book.isbn }}</td>
    <td>{{ book.title }}</td>
    <td>{{ book.numPages }}</td>
    <td><img :src="book.cover" width="100" /></td>
  </tr>
</template>