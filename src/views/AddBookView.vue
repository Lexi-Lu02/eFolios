<script>
import { ref } from 'vue';
import db from '../firebase/init.js'
import { collection, addDoc } from 'firebase/firestore';
import BookList from '../components/BookList.vue';

export default {
  components: {
    BookList
  },
  setup() {
    const isbn = ref('');
    const title = ref('');
    const author = ref('');
    const bookListRef = ref(null);

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number');
          return;
        }

        const docRef = await addDoc(collection(db, "books"), {
          isbn: isbnNumber,
          title: title.value,
          author: author.value
        });
        console.log('Book added with ID:', docRef.id);
        console.log('Original data:', {title: title.value, author: author.value});
        
        isbn.value = '';
        title.value = '';
        author.value = '';
        alert('Book added successfully!');
        
        // Refresh the BookList component
        if (bookListRef.value) {
          bookListRef.value.fetchBooks();
        }
      } catch (error) {
        console.error('Error adding book: ', error);
      }
    };

    return {
      isbn,
      title,
      author,
      addBook,
      bookListRef
    };
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">Add Book</h1>
        <p class="text-center">Add new book records to the Firestore database</p>
        
        <form @submit.prevent="addBook">
          <div class="mb-3">
            <label for="isbn" class="form-label">ISBN:</label>
            <input 
              type="text" 
              class="form-control" 
              id="isbn" 
              v-model="isbn"
              required 
            />
          </div>
          
          <div class="mb-3">
            <label for="title" class="form-label">Title:</label>
            <input 
              type="text" 
              class="form-control" 
              id="title" 
              v-model="title"
              placeholder="Enter book title (will be auto-capitalized)"
              required 
            />
          </div>
          
          <div class="mb-3">
            <label for="author" class="form-label">Author:</label>
            <input 
              type="text" 
              class="form-control" 
              id="author" 
              v-model="author"
              placeholder="Enter author name (will be auto-capitalized)"
              required 
            />
          </div>
          
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Add Book</button>
          </div>
        </form>
      </div>
    </div>
    
      <!-- BookList component loaded under the AddBook page -->
      <div class="row mt-5">
        <div class="col-12">
          <BookList ref="bookListRef" />
        </div>
      </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
}

.alert {
  margin-bottom: 1rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
