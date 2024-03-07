<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRouter, type RouteLocationNormalized } from 'vue-router';
import type { Book } from '../types'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';

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

onBeforeRouteLeave((to) => {
  if (hasDialogConfirmed.value) {
    return true;
  } else {
    dialogIsVisible.value = true;
    intendedRoute.value = to;
    return false;
  }
})

const router = useRouter();
const dialogIsVisible = ref(false)
const hasDialogConfirmed = ref(false)
const intendedRoute = ref<RouteLocationNormalized | null>(null)

function reject() {
  dialogIsVisible.value = false;
  hasDialogConfirmed.value = false;
}

function confirm() {
  dialogIsVisible.value = false;
  hasDialogConfirmed.value = true;

  if (intendedRoute.value) {
    router.push(intendedRoute.value.fullPath);
  }
}
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
  <ConfirmationDialog :show="dialogIsVisible" @cancel="reject" @confirm="confirm">

    <template #header>
      ⛔️ Unsaved changes
    </template>

    <template #body>
      Do you really want to leave the page?
    </template>
  </ConfirmationDialog>
</template>