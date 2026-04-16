<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const onEnviar = (): void => {
  if (!email.value.trim() || !password.value.trim()) return
  router.push('/')
}
</script>

<template>
  <div class="container text-center mt-5">
    <form @submit.prevent="onEnviar()">
      <div class="form-group">
        <h1>Registro</h1>
        <label for="exampleInputEmail1">Email</label>
        <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
        <small id="emailHelp" class="form-text text-muted" >We'll never share your email with anyone else.</small>
      </div>
      <br />
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
      </div>
      <br />
      <button type="submit" class="btn btn-primary">Registrarse</button>
    </form>
  </div>
</template>

<style scoped>
</style>
