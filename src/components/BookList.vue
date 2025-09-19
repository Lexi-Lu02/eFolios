<template>
  <div>
    <h1>Books with ISBN > 1000 (Ordered by ISBN, Limited to 5)</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js'
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);

    const fetchBooks = async () => {
      try {
        const q = query(
          collection(db, 'books'), 
          where('isbn', '>', 1000),
          orderBy('isbn', 'asc'),
          limit(5)
        );
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          console.log('Found book:', doc.data());
          booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
        console.log('Total books with ISBN > 1000 (limited to 10, ordered by ISBN):', booksArray.length);
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    return {
      books,
      fetchBooks
    };
  }
}
</script>
