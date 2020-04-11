<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Create</h4>
      </div>

      <form @submit.prevent="handleCreate">
        <div class="input-field">
          <input id="title" type="text" v-model="title" :class="{invalid: $v.title.$dirty && !$v.title.required}" />
          <label for="title">Title</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >
            Enter Title
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
import M from 'materialize-css'
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  title: 'category-create',
  data: () => ({
    limit: 10,
    title: ''
  }),
  validations: {
    title: { required },
    limit: { required, minValue: minValue(10) }
  },
  mounted () {
    M.updateTextFields()
  },
  methods: {
    async handleCreate () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const categoryData = {
        limit: this.limit,
        title: this.title
      }
      try {
        const category = await this.$store.dispatch('createCategory', categoryData)
        this.limit = 10
        this.title = ''
        this.$v.$reset()
        this.$message('The category was created.')
        this.$emit('created', category)
      } catch (e) {}
    }
  }
}
</script>
