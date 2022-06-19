<template>
  <div v-loading="loading">
    <el-dialog v-model="dialogFormVisible" title="Add new category">
      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input id="name" type="text" v-model="categoryForm.name" :class="{ invalid: v$.name.$error }" />
          <label for="name">Category name</label>
          <small class="helper-text" :class="{ invalid: v$.name.$error }">Please enter category name</small>
        </div>
        <div class="input-field">
          <input id="limit" type="number" v-model.number="categoryForm.limit" :class="{ invalid: v$.limit.$error }" />
          <label for="limit">Limit</label>
          <small class="helper-text" :class="{ invalid: v$.limit.$error }">Please limit for category</small>
        </div>
        <div class="input-field">
          <input id="description" type="text" v-model="categoryForm.description" />
          <label for="description">Description</label>
        </div>
      </form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" native-type="submit" @click="submitHandler">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, nextTick, watch } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import M from 'materialize-css'
import { useCategoriesStore } from '@/stores/categories';
import { ElMessageBox } from 'element-plus';
import { fmtApiError } from '@/utils';

const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue', 'categoryCreated'])
const categoriesStore = useCategoriesStore()

onMounted(() => {
  setTimeout(() => {
    M.updateTextFields()
  }, 0)
})
const dialogFormVisible = ref(props.modelValue)
let loading = ref(false)

const categoryForm = reactive({
  name: '',
  limit: 1,
  description: '',
})
const rules = {
  name: { required },
  limit: { required, minValue: minValue(1) },
}

watch(dialogFormVisible, (newValue, oldValue) => {
  emit('update:modelValue', newValue)
})
watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    dialogFormVisible.value = newVal
  }
)

const v$ = useVuelidate(rules, categoryForm)

function submitHandler() {
  if (v$.value.$invalid) {
    v$.value.$touch()
    return
  }
  const formData = {
    name: categoryForm.name,
    limit: categoryForm.limit,
    description: categoryForm.description
  }
  loading.value = true
  try {
    categoriesStore.createCategory(formData).then(() => {
      loading.value = false
      emit('categoryCreated')
    }).catch((error) => {
      loading.value = false
      ElMessageBox.alert(fmtApiError(error).message, 'Category creation error')
    })
  } catch (e) {
    ElMessageBox.alert(`${e}`, 'Error')
  }

}
</script>
