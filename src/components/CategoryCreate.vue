<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Create</h4>
      </div>

      <form @submit.prevent="handleCreate">
        <div class="input-field">
          <input id="name" type="text" v-model="name" :class="{invalid: $v.name.$dirty && !$v.name.required}" />
          <label for="name">Name</label>
          <span
            v-if="$v.name.$dirty && !$v.name.required"
            class="helper-text invalid"
          >
            Enter name
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model="limit"
            :class="{invalid: ($v.limit.$dirty && !$v.limit.required || $v.limit.$dirty && !$v.limit.minValue)}"
          />
          <label for="limit">Limit</label>
          <span
            class="helper-text invalid"
            v-if="($v.limit.$dirty && $v.limit.required || $v.limit.$dirty && $v.limit.minValue)"
          >
            Minimail value</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Create
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  name: 'category-create',
  data: () => ({
    limit: 10,
    name: ''
  }),
  validations: {
    name: { required },
    limit: { required, minValue: minValue(10) }
  },
  methods: {
    async handleCreate () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const categoryData = {
        limit: this.limit,
        name: this.name
      }
      await this.$store.dispatch('createCategory', categoryData)
      this.limit = 10
      this.name = ''
    }
  }
}
</script>
