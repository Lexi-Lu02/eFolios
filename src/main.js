// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { initializeApp } from 'firebase/app'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFmWfqN9YGKvDb96GcuuBsFG8O5htQgtE",
  authDomain: "week7-lexi.firebaseapp.com",
  projectId: "week7-lexi",
  storageBucket: "week7-lexi.appspot.com",
  messagingSenderId: "454915061752",
  appId: "1:454915061752:web:22ab5ccef568502fe4480d"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
// app.component('DataTable', DataTable)
// app.component('Column', Column)

app.mount('#app')
