<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import type { Book } from '../types'

const props = defineProps<{
  isbn: string
}>()

const book = ref<Book | null>(null)
const isLoaded = ref(false)

async function fetchBook(isbn: string) {
  book.value = null;
  isLoaded.value = false;

  const response = await fetch(`https://bookmonkey-read-only.onrender.com/books/${isbn}`)
  const maybeBook = await response.json() as Book

  if (response.status === 200) {
    book.value = maybeBook
  }

  isLoaded.value = true
}

onMounted(() => fetchBook(props.isbn as string))
watch(() => props.isbn, (newIsbn) => fetchBook(newIsbn as string))


</script>

<template>
  <template v-if="isLoaded">
    <form v-if="book">
      <label for="title">Title</label>
      <input type="text" id="title" name="title" placeholder="Book Title" v-model.lazy.trim="book.title">
    </form>
    <span v-else>
      We couldn't find any book with the ISBN <strong>{{ isbn }}</strong>
    </span>
  </template>
</template>