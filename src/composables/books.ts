import { watch, ref, onMounted } from 'vue'
import type { Book } from '../types'

export function useBooks(url: string) {
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
    const response = await fetch(`${url}?_start=0&_end=50`)
    books.value = await response.json() as Book[]
    isLoaded.value = true
  }

  onMounted(() => {
    getBooks()
  })

  watch(userInput, (newValue) => {
    filterBooks(newValue)
  })

  return {
    books,
    isLoaded,
    userInput
  }
}