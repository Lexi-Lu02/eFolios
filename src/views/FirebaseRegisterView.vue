<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center">Create an Account</h1>
        
        <form @submit.prevent="register" class="mt-4">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Email"
              v-model="email"
              required
            />
          </div>
          
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="password"
              required
            />
          </div>
          
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Save to Firebase</button>
          </div>
        </form>
        
        <div class="text-center mt-3">
          <p>Already have an account? <router-link to="/FireLogin">Sign in here</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase Register Successful!")
      router.push("/FireLogin")
    })
    .catch((error) => {
      console.log(error.code);
      alert("Registration failed: " + error.message)
    })
}
</script>

<style scoped>
</style>
