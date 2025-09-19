<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center">Sign in</h1>
        
        <form @submit.prevent="signin" class="mt-4">
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Email"
              v-model="email"
              required
            />
          </div>
          
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="password"
              required
            />
          </div>
          
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Sign in via Firebase</button>
          </div>
        </form>
        
        <div class="text-center mt-3">
          <p>Don't have an account? <router-link to="/FireRegister">Register here</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()

const signin = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Firebase Sign-in Successful!")
      router.push("/")
      console.log(auth.currentUser) //To check the current User signed in
    })
    .catch((error) => {
      console.log(error.code);
    })
}
</script>

<style scoped>
</style>
