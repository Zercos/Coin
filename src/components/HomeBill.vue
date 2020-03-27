<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Currency bill</span>
        <p v-for="currency of currencies" :key="currency" class="currency-line">
          <span>{{ getCurrency(currency) | fmtMoney(currency) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-bill',
  props: {
    rates: {
      type: Object,
      default: () => ([])
    }
  },
  data: () => ({
    currencies: ['EUR', 'USD', 'UAH']
  }),
  computed: {
    bill () {
      return this.$store.getters.info.bill
    }
  },
  methods: {
    getCurrency (currency) {
      return this.bill * this.rates[currency]
    }
  }
}
</script>
