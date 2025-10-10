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
    this.getBookCountAPI();
  },
  methods: {
    async getBookCountAPI() {
      try {
        const response = await axios.get('https://countbooks-bjdqkc5vla-uc.a.run.app');
        this.jsondata = response.data;
        this.error = null;
      } catch (error) {
        console.error('Error fetching book count:', error);
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
