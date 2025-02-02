import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import store from './store';
import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_BACK_END_HOST; 
axios.defaults.withCredentials = true;


document.title = "Birb Nation";


loadFonts()

createApp(App)
  .use(store)
  .use(router)
  .use(vuetify)
  .mount('#app')
