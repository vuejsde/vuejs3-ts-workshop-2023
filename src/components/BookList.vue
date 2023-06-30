<script setup lang="ts">
import { computed, ref } from 'vue'

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
const isLoaded = ref(false);

function onClick() {
  books.value = [
    {
      "id": "1001606140805",
      "title": "Java Web Scraping Handbook",
      "subtitle": "Learn advanced Web Scraping techniques",
      "isbn": "1001606140805",
      "abstract": "Web scraping or crawling is the art of fetching data from a third party website by downloading and parsing the HTML code to extract the data you want. It can be hard. From bad HTML code to heavy Javascript use and anti-bot techniques, it is often tricky. Lots of companies use it to obtain knowledge ...",
      "author": "Kevin Sahin",
      "publisher": "Leanpub",
      "price": "$0.00",
      "numPages": 115,
      "cover": "http://localhost:4730/covers/1001606140805.png",
      "userId": 1
    },
    {
      "id": "9780071494618",
      "title": "Hacking Exposed Web 2.0",
      "subtitle": "Web 2.0 Security Secrets and Solutions",
      "isbn": "9780071494618",
      "abstract": "Protect your Web 2.0 architecture against the latest wave of cybercrime using expert tactics from Internet security professionals. Hacking Exposed Web 2.0 shows how hackers perform reconnaissance, choose their entry point, and attack Web 2.0 - based services, and reveals detailed countermeasures and...",
      "author": "Rich Cannings, Himanshu Dwivedi, Zane Lackey",
      "publisher": "McGraw-Hill",
      "price": "$12.03",
      "numPages": 258,
      "cover": "http://localhost:4730/covers/9780071494618.png",
      "userId": 1
    },
    {
      "id": "9780071740647",
      "title": "Hacking Exposed Web Applications, 3rd Edition",
      "subtitle": "Web Applications Security Secrets and Solutions",
      "isbn": "9780071740647",
      "abstract": "Protect your Web applications from malicious attacks by mastering the weapons and thought processes of today's hacker. Written by recognized security practitioners and thought leaders, Hacking Exposed Web Applications, Third Edition is fully updated to cover new infiltration methods and countermeasu...",
      "author": "Joel Scambray, Vincent Liu, Caleb Sima",
      "publisher": "McGraw-Hill",
      "price": "$9.50",
      "numPages": 482,
      "cover": "http://localhost:4730/covers/9780071740647.png",
      "userId": 1
    },
    {
      "id": "9780134655536",
      "title": "Node.js, MongoDB and Angular Web Development, 2nd Edition",
      "subtitle": "The definitive guide to using the MEAN stack to build web applications",
      "isbn": "9780134655536",
      "abstract": "Node.js is a leading server-side programming environment, MongoDB is the most popular NoSQL database, and Angular is the leading framework for MVC-based front-end development. Together, they provide an easy-to-implement, fully integrated web development stack that allows web programmers to create hi...",
      "author": "Brad Dayley, Brendan Dayley, Caleb Dayley",
      "publisher": "Addison-Wesley",
      "price": "$33.16",
      "numPages": 640,
      "cover": "http://localhost:4730/covers/9780134655536.png",
      "userId": 1
    }
  ]
  isLoaded.value = true;
}

const filteredBooks = computed(() => books.value.filter((book) => book.numPages > 300))
</script>

<template>
  <table role="grid">
    <thead>
      <tr>
        <th scope="col">ISBN</th>
        <th scope="col">Title</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in filteredBooks" :key="book.isbn">
        <td>{{ book.isbn }}</td>
        <td>{{ book.title }}</td>
      </tr>
    </tbody>
  </table>
  <button @click.once="onClick" :disabled="isLoaded">Load Books</button>
</template>