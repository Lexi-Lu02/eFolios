<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center">Log Out</h1>
        <p class="text-center">Are you sure you want to sign out?</p>
        
        <div class="text-center mt-4">
          <button @click="logout" class="btn btn-danger me-3">Yes, Sign Out</button>
          <router-link to="/" class="btn btn-secondary">Cancel</router-link>
        </div>
        
        <div class="mt-4" v-if="currentUser">
          <h5>Current User Information:</h5>
          <p><strong>Email:</strong> {{ currentUser.email }}</p>
          <p><strong>UID:</strong> {{ currentUser.uid }}</p>
          <p><strong>Last Sign In:</strong> {{ formatDate(currentUser.metadata.lastSignInTime) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = getAuth()
const currentUser = ref(null)

onMounted(() => {
  // Listen for authentication state changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser.value = user
      console.log("Current logged-in user:", user)
    } else {
      currentUser.value = null
      console.log("No user is currently signed in")
    }
  })
})

const logout = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully")
      console.log("Current user after logout:", auth.currentUser)
      alert("You have been signed out successfully!")
      router.push("/FireLogin")
    })
    .catch((error) => {
      console.log("Sign out error:", error.code)
    })
}

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A'
  return new Date(timestamp).toLocaleString()
}
</script>

<style scoped>
</style>
