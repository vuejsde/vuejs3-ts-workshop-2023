import { createRouter, createWebHashHistory } from "vue-router";
const BookList = () => import('./pages/BookList.vue')
const BookDetail = () => import('./pages/BookDetail.vue')
import AboutPage from './pages/AboutPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{
    path: '/',
    alias: '/books',
    component: BookList,
    name: 'home',
  }, {
    path: '/about',
    component: AboutPage,
    name: 'about',
  }, {
    path: '/books/:isbn',
    component: BookDetail,
    name: 'book-detail',
    props: true
  }],
})

export default router;