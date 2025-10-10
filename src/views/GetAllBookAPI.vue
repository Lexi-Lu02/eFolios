<template>
  <pre>{{ jsondata }}</pre>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      jsondata: null,
      error: null
    };
  },
  mounted() {
    this.getAllBooksAPI();
  },
  methods: {
    async getAllBooksAPI() {
      try {
        // Call the getAllBooks Firebase function
        const response = await axios.get('https://us-central1-week7-lexi.cloudfunctions.net/getAllBooks');
        this.jsondata = response.data;
        this.error = null;
      } catch (error) {
        console.error('Error fetching all books:', error);
        this.error = error;
        this.jsondata = null;
      }
    },
  },
};
</script>

<style scoped>
pre {
  font-family: monospace;
  font-size: 14px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 4px;
  margin: 20px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
