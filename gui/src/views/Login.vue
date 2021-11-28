<template>
  <img class="responsive-img" src="@/assets/logo.png" alt="" style="display: block; margin: 0 auto;">
  <form class="card" style="max-width: 400px; width: 100%" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title" style="text-align: center">Login</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          :class="{invalid: (v$.email.$dirty && !v$.email.required) || (v$.email.$dirty && !v$.email.email)}"
          v-model.trim="email"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="v$.email.$dirty && !v$.email.required"
        >Please provide the email address</small>
        <small
          class="helper-text invalid"
          v-else-if="v$.email.$dirty && !v$.email.email"
        >Please provide the correct email address</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          :class="{invalid: (v$.password.$dirty && !v$.password.required) || (v$.password.$dirty && !v$.password.minLength)}"
          v-model="password"
        />
        <label for="password">Password</label>
        <small
          class="helper-text invalid"
          v-if="v$.password.$dirty && !v$.password.required"
        >Please provide the password</small>
        <small
          class="helper-text invalid"
          v-else-if="v$.password.$dirty && !v$.password.minLength"
        >Password lenght can't be less then {{v$.password.$params.minLength.min}}</small>
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

<script>
import { defineComponent } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
export default defineComponent({
  name: 'Login',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  mounted () {
    if (this.$route.query.message) {
      this.$message(this.$route.query.message)
    }
  },
  methods: {
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }
})
</script>
