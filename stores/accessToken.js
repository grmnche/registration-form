import { defineStore } from 'pinia';

export const useAccessToken = defineStore('accessToken', {
  state: () => ({
    accessToken: '',
  }),
  actions: {
    setAccessToken(token) {
      this.accessToken = token;
    },
  },
  getters: {
    getAccessToken(state) {
      return state.accessToken;
    },
  },
});
