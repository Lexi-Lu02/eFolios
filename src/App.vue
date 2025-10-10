<script>
import BHeader from './components/BHeader.vue'
import CountBookAPI from './views/CountBookAPI.vue'
import GetAllBookAPI from './views/GetAllBookAPI.vue'

export default {
  name: 'App',
  components: { BHeader, CountBookAPI, GetAllBookAPI },
  computed: {
    showHeader() {
      return this.$route.name !== 'CountBookAPI' && this.$route.name !== 'GetAllBookAPI';
    }
  }
}
</script>

<template>
  <div class="main-container">
    <header v-if="showHeader">
      <BHeader />
    </header>

    <main class="main-box">
      <!-- <LibraryRegistrationForm /> -->
      <!-- <JSONLab /> -->
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.main-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}

.main-box {
  margin-top: 20px;
}

/* Card styling */
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.list-group-item {
  padding: 10px;
}

/* Form styling */
.form {
  text-align: center;
  margin-top: 50px;
}

/* Focus styling for form inputs */
#username:focus,
#password:focus,
#isAustralian:focus {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
