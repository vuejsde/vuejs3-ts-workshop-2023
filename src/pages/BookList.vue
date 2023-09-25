<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import BookListItem from '../components/BookListItem.vue'
import { useBooksStore } from '../stores/books'

const store = useBooksStore()
const { books, userInput } = storeToRefs(store)
const { getBooks } = store

function readBook(index: number) {
  books.value[index] = {
    ...books.value[index],
    read: !(books.value[index]?.read ?? false),
  }
}

onMounted(() => getBooks())

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
        <th scope="col">Read?</th>
      </tr>
    </thead>
    <tbody>
      <BookListItem v-for="(book, index) in books" :key="book.isbn" v-bind="book" @read="readBook(index)" />
    </tbody>
  </table>
</template>