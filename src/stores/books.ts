import { defineStore } from 'pinia'
import { watch, ref, computed } from 'vue'
import type { Book } from '../types'

export const useBooksStore = defineStore('books', () => {
  const url = "https://bookmonkey-read-only.onrender.com/books";
  const books = ref<Book[]>([])
  const isLoaded = ref(false)

  const userInput = ref('')

  async function filterBooks(value: string) {
    isLoaded.value = false
    books.value = []

    const response = await fetch(`${url}?q=${value}`)
    books.value = await response.json() as Book[]
    isLoaded.value = true
  }

  async function getBooks() {
    userInput.value = ''
    const response = await fetch(`${url}?_start=0&_end=50`)
    books.value = await response.json() as Book[]
    isLoaded.value = true
  }

  watch(userInput, (newValue) => {
    filterBooks(newValue)
  })

  const loadedBooks = computed(() => books.value?.length ?? 0)

  return {
    books,
    isLoaded,
    userInput,
    getBooks,
    loadedBooks,
  }
})
