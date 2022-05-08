<template>
  <div v-loading="loading">
    <el-dialog v-model="dialogFormVisible" title="Edit record">
      <form @submit.prevent="handleSubmit">
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
      </form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" native-type="submit" @click="handleSubmit">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import M from 'materialize-css'
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { ElMessageBox, ElMessage, ElIcon } from 'element-plus'
import { fmtApiError } from '@/utils'
import useVuelidate from '@vuelidate/core'
import { minValue, required } from '@vuelidate/validators'
import { useRecordsStore } from '@/stores/records'
import type { ICategory } from '@/stores/categories'

const props = defineProps({ modelValue: Boolean, rowData: Object, categories: Array })
const emit = defineEmits(['update:modelValue', 'recordUpdated'])
const recordsStore = useRecordsStore()

const categories = computed(() => props.categories as ICategory[])
const dialogFormVisible = ref(props.modelValue)
let loading = ref(false)
const recordForm = reactive({
  category: props.rowData!.category,
  amount: props.rowData!.amount,
  type: props.rowData!.type,
  description: props.rowData!.description,
})
const rules = {
  category: { required },
  amount: { required, minValue: minValue(1) },
  type: { required },
  description: { required },
}

const v$ = useVuelidate(rules, recordForm)

onMounted(() => {
  setTimeout(() => {
    M.updateTextFields()
  }, 100)
})

watch(dialogFormVisible, (newValue, oldValue) => {
  emit('update:modelValue', newValue)
})
watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    dialogFormVisible.value = newVal
  }
)

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
  loading.value = true
  try {
    recordsStore
      .modifyRecord(props.rowData!.id, formData)
      .then(() => {
        loading.value = false
        emit('recordUpdated')
      })
      .catch((error) => {
        loading.value = false
        ElMessageBox.alert(fmtApiError(error).message, 'Record update error')
      })
  } catch (e) {
    ElMessageBox.alert(`${e}`, 'Error')
  }
}
</script>
