<script setup lang="ts">
import { watch, ref, onMounted } from 'vue'
import BookListItem from './BookListItem.vue'
import type { Book } from '@/types/book'

const books = ref<Book[]>([])

const userInput = ref('')

async function filterBooks(value: string) {
  books.value = []

  const response = await fetch(`http://localhost:4730/books?q=${value}`)
  books.value = await response.json() as Book[]
}

async function getBooks() {
  const response = await fetch('http://localhost:4730/books?_start=0&_end=50')
  books.value = await response.json() as Book[]
}

onMounted(() => {
  getBooks()
})

watch(userInput, (newValue) => {
  filterBooks(newValue)
})
</script>

<template>
  <form>
    <label for="search">Search</label>
    <input type="search" id="search" name="search" placeholder="Book title" v-model="userInput">
  </form>
  <table role="grid">
    <thead>
      <tr>
        <th scope="col">ISBN</th>
        <th scope="col">Title</th>
        <th scope="col">Pages</th>
        <th scope="col">Cover</th>
      </tr>
    </thead>
    <tbody>
      <BookListItem v-for="book in books" :key="book.isbn" :book="book" />
    </tbody>
  </table>
</template>