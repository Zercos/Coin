<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Home accounting</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
          v-model.trim="email"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >Please provide the email address</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >Please provide the correct email address</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
          v-model="password"
        />
        <label for="password">Password</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >Please provide the password</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >Password lenght can't be less then {{$v.password.$params.minLength.min}}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Sign in
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Not signed up?
        <router-link to="/register">Sign up</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'login',
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.$router.push('/')
    }
  }
}
</script>
