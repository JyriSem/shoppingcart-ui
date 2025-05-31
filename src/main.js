import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/global.css'; // Import global styles
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');