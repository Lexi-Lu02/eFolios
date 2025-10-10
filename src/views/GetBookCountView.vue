<template>
  <div id="app" class="book-counter-container">
    <h1 class="title">Book Counter</h1>
    <button @click="getBookCount" class="count-button">Get Book Count</button>
    <p v-if="count !== null" class="result">Total number of books: {{ count }}</p>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      count: null,
      error: null,
    };
  },
  methods: {
    async getBookCount() {
      try {
        console.log('Attempting to get book count from Firebase...');
        
        // Call the real Firebase function
        const response = await axios.get('https://countbooks-bjdqkc5vla-uc.a.run.app');
        this.count = response.data.count;
        this.error = null;
        console.log('Successfully got book count:', response.data);
        
      } catch (error) {
        console.error('Error fetching book count:', error);
        this.error = `Error: ${error.message}`;
        this.count = null;
      }
    },
  },
};
</script>

<style scoped>
.book-counter-container {
  text-align: center;
}
</style>
