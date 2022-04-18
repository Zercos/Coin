<template>
  <img class="responsive-img" src="@/assets/logo.png" style="display: block; margin: 0 auto" />
  <form class="card" style="max-width: 400px; width: 100%" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title" style="text-align: center">Login</span>
      <div class="input-field">
        <input id="email" type="text" :class="{ invalid: v$.email.$error }" v-model.trim="email" />
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="v$.email.$error && !email"> Please provide the email address </small>
        <small class="helper-text invalid" v-else-if="v$.email.$error">Please provide the correct email address</small>
      </div>
      <div class="input-field">
        <input id="password" type="password" :class="{ invalid: v$.password.$error }" v-model="password" />
        <label for="password">Password</label>
        <small class="helper-text invalid" v-if="v$.password.$error">
          Please provide the password, lenght can't be less then 6
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Log in
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required, email as emailVal, minLength } from '@vuelidate/validators'
import { ElNotification } from 'element-plus'

import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// Hooks
onMounted(() => {
  if (route.query.message) ElNotification({ message: route.query.message as string })
})

const email = ref('')
const password = ref('')

const rules = {
  email: { email: emailVal, required },
  password: { required, minLength: minLength(6) },
}
const v$ = useVuelidate(rules, { email, password })

async function submitHandler() {
  if (v$.value.$invalid) {
    v$.value.$touch()
    return
  }
  try {
    await authStore.login(email.value, password.value)
    await router.push({name: 'Home'})
  } catch (e) {
    ElNotification({ type: 'error', message: `Not logged in, Error: ${e}` })
  }
}
</script>
