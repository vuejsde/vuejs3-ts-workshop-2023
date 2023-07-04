import { createRouter, createWebHashHistory } from "vue-router";
import BookList from './pages/BookList.vue'
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
  }],
})

export default router;