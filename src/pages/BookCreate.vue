<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { Book } from '../types'
import { required, minLength } from '../utils/validations'

type PartialBook = Pick<Book, 'isbn' | 'title' | 'abstract' | 'author'>
type BookCreationField = keyof Pick<PartialBook, 'isbn' | 'title' | 'abstract' | 'author'>
type FormErrors = Record<BookCreationField, string>

const book = ref<PartialBook>({
  isbn: '',
  title: '',
  abstract: '',
  author: ''
})
const isSuccessful = ref(false)
const wasPosted = ref(false)
const errors = ref<FormErrors>({
  isbn: '',
  title: '',
  author: '',
  abstract: ''
})

function submit() {
  if ((Object.keys(errors.value)).some(
    (val) => errors.value[val as BookCreationField] !== ""
  )) {
    console.log('Invalid form')
  } else {
    isSuccessful.value = false
    wasPosted.value = false

    try {
      fetch(
        new Request('https://bookmonkey-read-only.onrender.com/books',
          {
            method: 'POST',
            body: JSON.stringify(book.value),
            headers: {
              "Content-Type": "application/json",
            }
          }
        )
      )

      isSuccessful.value = true
    } catch (e) {
      isSuccessful.value = false
    } finally {
      wasPosted.value = true
    }
  }
}

function validateIsbn() {
  if (!required(book.value?.isbn ?? "")) {
    errors.value.isbn = "ISBN is required.";
  } else if (!minLength(book.value?.isbn ?? "", 13)) {
    errors.value.isbn = "The ISBN must be at least 13 characters long.";
  } else {
    errors.value.isbn = "";
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

onMounted(() => {
  validateIsbn()
  validateTitle()
  validateAuthor()
  validateAbstract()
})
</script>

<template>
  <template v-if="wasPosted">
    <p v-if="isSuccessful">Successfully created new book.</p>
    <p v-else>An error occured.</p>
  </template>

  <form @submit.prevent="submit" novalidate v-else>
    <label for="isbn">ISBN</label>
    <input type="text" id="isbn" name="isbn" placeholder="Book ISBN" v-model.lazy.trim="book.isbn" @change="validateIsbn"
      :aria-invalid="errors.isbn.length > 0">
    <small v-if="errors.isbn">{{ errors.isbn }}</small>

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
</template>