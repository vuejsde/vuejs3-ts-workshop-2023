import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(true);
  const username = ref('vuejsde');
  const id = ref(1);

  return {
    isAuthenticated,
    username,
    id,
  }
});