import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'

import VueLoading from 'vue-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'

import { currency } from './methods/filters'
import 'bootstrap-icons/font/bootstrap-icons.css'


const app = createApp(App)

app.config.globalProperties.$http = axios
app.config.globalProperties.$httpMessageState = function(response, message = '') {
  if (!response || !response.data) return;
  const msg = response.data.message || '操作成功';
  alert(message ? `${message}：${msg}` : msg);
}
app.config.globalProperties.$filters = {
    currency,
}
app.use(router)
app.component('VueLoading', VueLoading)
app.mount('#app')
