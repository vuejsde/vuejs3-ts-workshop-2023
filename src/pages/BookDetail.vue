<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { onBeforeRouteLeave } from 'vue-router';
import type { Book } from '../types'

const { isbn } = defineProps<{
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

onMounted(() => fetchBook(isbn as string))
watch(() => isbn, (newIsbn) => fetchBook(newIsbn as string))

onBeforeRouteLeave(() => {
  const answer = window.confirm(
    "Do you really want to leave? You have unsaved changes!"
  )
  return answer
})
</script>

<template>
  <template v-if="isLoaded">
    <ul v-if="book">
      <li v-for="(value, key) in book" :key="key">
        {{ key }}: {{ value }}
      </li>
    </ul>
    <span v-else>
      We couldn't find any book with the ISBN <strong>{{ isbn }}</strong>
    </span>
  </template>
</template>