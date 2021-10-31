<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Currency</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Value</th>
              <th>Rate</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="currency in currencies" :key="currency">
              <td>{{ currency }}</td>
              <td>{{ rates[currency] }}</td>
              <td>{{ Date.parse(date) | fmtDate() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-currency',
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['EUR', 'USD', 'UAH']
  })
}
</script>
