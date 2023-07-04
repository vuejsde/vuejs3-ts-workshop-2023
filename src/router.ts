import { createRouter, createWebHashHistory } from "vue-router";
const BookList = () => import('./pages/BookList.vue')
const BookDetail = () => import('./pages/BookDetail.vue')
const BookEdit = () => import('./pages/BookEdit.vue')
const BookCreate = () => import('./pages/BookCreate.vue')
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
  }, {
    path: '/books/:isbn/edit',
    component: BookEdit,
    name: 'book-edit',
    props: true
  }, {
    path: '/books/create',
    component: BookCreate,
    name: 'book-create',
  },],
})

export default router;