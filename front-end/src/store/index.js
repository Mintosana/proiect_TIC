import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

export default createStore({
    state: {
        token: null,
        userId: null,
    },
    mutations: {
        setUserId(state, userId) {
            state.userId = userId
        },
        setToken(state, token) {
            state.token = token;
        }
    },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
