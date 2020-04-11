<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="input-field">
          <select ref="selectForm" v-model="current">
            <option v-for="c in categories" :key="c.id" :value="c.id" >{{ c.title }}</option>
          </select>
          <label>Select category</label>
        </div>

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
          Refresh
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
  name: 'category-edit',
  props: {
    categories: {
      required,
      type: Array
    }
  },
  data: () => ({
    title: '',
    limit: 10,
    current: null
  }),
  validations: {
    title: { required },
    limit: { required, minValue: minValue(10) }
  },
  mounted () {
    M.updateTextFields()
    this.select = M.FormSelect.init(this.$refs.selectForm)
  },
  beforeDestroy () {
    if (this.select && this.select.destoroy) this.select.destoroy()
  },
  created () {
    this.current = this.categories[0].id
    this.title = this.categories[0].title
    this.limit = this.categories[0].limit
  },
  watch: {
    current (value) {
      const category = this.categories.find(c => c.id === value)
      this.limit = category.limit
      this.title = category.title
    }
  },
  methods: {
    async handleSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const categoryData = {
        limit: this.limit,
        title: this.title,
        id: this.current
      }
      try {
        await this.$store.dispatch('editCategory', categoryData)
        this.$message('The category was modified.')
      } catch (e) {}
    }
  }
}
</script>
