import { createApp } from 'vue'
import { createPinia } from 'pinia';
import router from './router'
import App from './App.vue'

const store = createPinia();

const app = createApp(App)
app.use(router)
app.use(store);
app.mount('#app')
