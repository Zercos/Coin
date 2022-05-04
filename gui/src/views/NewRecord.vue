<template>
  <div v-loading="loading">
    <div class="page-title">
      <h3>New record</h3>
    </div>
    <p class="center" v-if="!categories.length">
      No active categories
      <router-link to="/categories">Add category</router-link>
    </p>
    <form class="form" v-else @submit.prevent="handleSubmit">
      <div class="input-field">
        <el-select v-model="recordForm.category" class="m-2" placeholder="Select category" size="large">
          <el-option v-for="c in categories" :key="c.id" :label="c.name" :value="c.id" />
        </el-select>
      </div>
      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="recordForm.type" />
          <span>Income</span>
        </label>
      </p>
      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="recordForm.type" />
          <span>Outcome</span>
        </label>
      </p>
      <div class="input-field">
        <input id="amount" type="number" v-model.number="recordForm.amount" :class="{ invalid: v$.amount.$error }" />
        <label for="amount">Amount</label>
        <small v-if="v$.amount.$error" class="helper-text" :class="{ invalid: v$.amount.$error }">
          Amount should be bigger than 1
        </small>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="recordForm.description"
          :class="{ invalid: v$.description.$error }"
        />
        <label for="description">Description</label>
        <span v-if="v$.description.$error" class="helper-text invalid">Description cannot be blank</span>
      </div>
      <el-button type="success" native-type="submit" size="large">Create
      <el-icon><ArrowRight /></el-icon>
      </el-button>
    </form>
  </div>
</template>

<script setup lang="ts">
import M from 'materialize-css'
import { ref, computed, reactive, onMounted } from 'vue'
import { useCategoriesStore } from '@/stores/categories'
import { ElMessageBox, ElMessage, ElIcon } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import { fmtApiError } from '@/utils'
import useVuelidate from '@vuelidate/core'
import { minValue, required } from '@vuelidate/validators'
import { useRecordsStore } from '@/stores/records'

const categoriesStore = useCategoriesStore()
const recordsStore = useRecordsStore()
const categories = computed(() => categoriesStore.activeCategories)
let loading = ref(false)
const recordForm = reactive({
  category: null,
  amount: 0,
  type: 'outcome',
  description: null,
})
const rules = {
  category: { required },
  amount: { required, minValue: minValue(1) },
  type: { required },
  description: { required },
}

const v$ = useVuelidate(rules, recordForm)

onMounted(() => {
  fetchCategories()
  setTimeout(() => {
    M.updateTextFields()
  }, 100)
})

function handleSubmit() {
  if (v$.value.$invalid) {
    v$.value.$touch()
    return
  }
  loading.value = true
  const formData = {
    category_id: recordForm.category,
    amount: recordForm.amount,
    description: recordForm.description,
    type: recordForm.type,
  }
  recordsStore.createRecord(formData).then(() => {
      loading.value = false
      ElMessage({ message: 'Record was created successfully', type: 'success' })
    }).catch((error) => {
      loading.value = false
      ElMessageBox.alert(fmtApiError(error).message, 'Record creation error')
    })
}

function fetchCategories() {
  loading.value = true
  categoriesStore
    .fetchCategories()
    .then(() => {
      loading.value = false
    })
    .catch((error) => {
      loading.value = false
      ElMessageBox.alert(fmtApiError(error).message, 'Categories fetch')
    })
}
</script>
