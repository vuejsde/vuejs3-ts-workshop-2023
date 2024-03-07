<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { watchDebounced } from '@vueuse/core'

type Book = {
  id: string;
  title: string;
  subtitle: string;
  isbn: string;
  abstract: string;
  author: string;
  publisher: string;
  price: string;
  numPages: number;
  cover: string;
  userId: number;
}

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

// watchEffect solution
// watchEffect(() => {
//   const inputVal = userInput.value;

//   if (inputVal) {
//     filterBooks(inputVal);
//   } else {
//     getBooks();
//   }
// })

// watchDebounced solution
onMounted(() => {
  getBooks()
});

watchDebounced(userInput, () => {
  filterBooks(userInput.value);
}, { debounce: 500, maxWait: 1000 },)
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
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in books" :key="book.isbn">
        <td>{{ book.isbn }}</td>
        <td>{{ book.title }}</td>
      </tr>
    </tbody>
  </table>
</template>