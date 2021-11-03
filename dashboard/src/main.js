import { createApp } from 'vue';
import Toast, { POSITION } from 'vue-toastification';
import App from './App.vue';
import router from './router';

import 'animate.css';
import '@/assets/css/tailwind.css';
import '@/assets/css/fonts.css';
import 'vue-toastification/dist/index.css';

const options = {
  position: POSITION.BOTTOM_RIGHT
};

const app = createApp(App);
app.use(router);
app.use(Toast, options);
app.mount('#app');
