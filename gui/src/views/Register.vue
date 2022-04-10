<template>
  <img class="responsive-img" src="@/assets/logo.png" style="display: block; margin: 0 auto" />
  <form class="card" style="max-width: 400px; width: 100%" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Registration</span>
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
      <div class="input-field">
        <input id="name" type="text" v-model="firstName" :class="{ invalid: v$.firstName.$error }" />
        <label for="name">First Name</label>
        <small class="helper-text" :class="{ invalid: v$.firstName.$error }">Please enter your first name</small>
      </div>
      <div class="input-field">
        <input id="name" type="text" v-model="lastName" :class="{ invalid: v$.lastName.$error }" />
        <label for="name">Last Name</label>
        <small class="helper-text" :class="{ invalid: v$.lastName.$error }">Please enter your last name</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>Agree with rules</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Sign up
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Have account?
        <router-link to="/login">Log in!</router-link>
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { required, email as emailVal, minLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')
const agree = ref(false)

const rules = {
  email: { email: emailVal, required },
  password: { required, minLength: minLength(6) },
  agree: { checked: (val: any) => val },
  firstName: { required },
  lastName: { required },
}
const v$ = useVuelidate(rules, { email, password, firstName, lastName, agree })

async function submitHandler() {
  if (v$.value.$invalid) {
    v$.value.$touch()
    return
  }
  const formData = { email, password, firstName, lastName, agree }
  try {
    await authStore.register(formData)
    router.push('/')
  } catch (e) {
    console.error(e)
  }
}
</script>
