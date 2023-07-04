<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import type { Book } from '../types'
import { required, minLength } from '../utils/validations'

type BookEditFields = keyof Pick<Book, 'title' | 'abstract' | 'author'>
type FormErrors = Record<BookEditFields, string>

const props = defineProps<{
  isbn: string
}>()

const book = ref<Book | null>(null)
const isLoaded = ref(false)
const errors = ref<FormErrors>({
  title: '',
  author: '',
  abstract: ''
})

async function fetchBook(isbn: string) {
  book.value = null;
  isLoaded.value = false;

  const response = await fetch(`https://bookmonkey-read-only.onrender.com/books/${isbn}`)
  const maybeBook = await response.json() as Book

  if (response.status === 200) {
    book.value = maybeBook
  }

  isLoaded.value = true

  validateTitle()
  validateAuthor()
  validateAbstract()
}

onMounted(() => fetchBook(props.isbn as string))
watch(() => props.isbn, (newIsbn) => fetchBook(newIsbn as string))

function submit() {
  if ((Object.keys(errors.value)).some(
    (val) => errors.value[val as BookEditFields] !== ""
  )) {
    console.log('Invalid form')
  } else {
    fetch(
      new Request(`https://bookmonkey-read-only.onrender.com/books/${props.isbn}`,
        {
          method: 'PUT',
          body: JSON.stringify(book.value),
          headers: {
            "Content-Type": "application/json",
          }
        }
      )
    )
  }
}

function validateTitle() {
  if (!required(book.value?.title ?? "")) {
    errors.value.title = "Title is required.";
  } else if (!minLength(book.value?.title ?? "", 5)) {
    errors.value.title = "The title must be at least 5 characters long.";
  } else {
    errors.value.title = "";
  }
}

function validateAuthor() {
  if (!required(book.value?.author ?? "")) {
    errors.value.author = "Author is required.";
  } else {
    errors.value.author = "";
  }
}

function validateAbstract() {
  if (!required(book.value?.abstract ?? "")) {
    errors.value.abstract = "Abstract is required.";
  } else if (!minLength(book.value?.abstract ?? "", 12)) {
    errors.value.abstract =
      "The abstract must be at least 12 characters long.";
  } else {
    errors.value.abstract = "";
  }
}
</script>

<template>
  <template v-if="isLoaded">
    <form v-if="book" @submit.prevent="submit" novalidate>
      <label for="title">Title</label>
      <input type="text" id="title" name="title" placeholder="Book Title" v-model.lazy.trim="book.title"
        @change="validateTitle" :aria-invalid="errors.title.length > 0">
      <small v-if="errors.title">{{ errors.title }}</small>

      <label for="author">Author</label>
      <input type="text" id="author" name="author" placeholder="Book Author" v-model.lazy.trim="book.author"
        @change="validateAuthor" :aria-invalid="errors.author.length > 0">
      <small v-if="errors.author">{{ errors.author }}</small>

      <label for="abstract">Abstract</label>
      <textarea id="abstract" name="abstract" placeholder="Book Abstract" v-model.lazy.trim="book.abstract"
        @change="validateAbstract" :aria-invalid="errors.abstract.length > 0"></textarea>
      <small v-if="errors.abstract">{{ errors.abstract }}</small>

      <button type="submit">Submit</button>
    </form>
    <span v-else>
      We couldn't find any book with the ISBN <strong>{{ isbn }}</strong>
    </span>
  </template>
</template>