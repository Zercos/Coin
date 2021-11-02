<template>
  <div class="home">
    <div>
      <div class="page-title">
        <h3>Bill</h3>

        <button class="btn waves-effect waves-light btn-small" @click="refresh">
          <i class="material-icons">refresh</i>
        </button>
      </div>
      <loader v-if="loading" />
      <div class="row" v-else>
        <home-bill :rates="currency.rates" />
        <home-currency :rates="currency.rates" :date="currency.date" />
      </div>
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'

export default {
  name: 'home',
  components: {
    HomeBill,
    HomeCurrency
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted () {
    this.currency = await this.$store.dispatch('getCurrency')
    this.loading = false
  },
  methods: {
    async refresh () {
      this.loading = true
      this.currency = await this.$store.dispatch('getCurrency')
      this.loading = false
    }
  }
}
</script>
