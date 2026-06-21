<script setup>
import { ref, computed } from 'vue'

const CATEGORIES = [
  { value: "alimentazione", label: "Alimentazione", color: "#10b981" },
  { value: "trasporti",    label: "Trasporti",     color: "#3b82f6" },
  { value: "intrattenimento", label: "Intrattenimento", color: "#8b5cf6" },
  { value: "salute",        label: "Salute",        color: "#ef4444" },
  { value: "shopping",     label: "Shopping",      color: "#f59e0b" },
  { value: "alloggio",     label: "Alloggio",      color: "#06b6d4" },
  { value: "altro",        label: "Altro",         color: "#6b7280" },
]


const datiSalvati = localStorage.getItem('pwa_expenses')
const budgetSalvato = localStorage.getItem('pwa_budget')

const expenses = ref(datiSalvati ? JSON.parse(datiSalvati) : [])
const budgetIniziale = ref(budgetSalvato ? parseFloat(budgetSalvato) : 0)


const totalAmount = computed(() => {
  return expenses.value.reduce((sum, e) => sum + e.amount, 0)
})


const budgetRimanente = computed(() => {
  return budgetIniziale.value - totalAmount.value
})

const averageAmount = computed(() => {
  return expenses.value.length > 0 ? totalAmount.value / expenses.value.length : 0
})

const monthTotal = computed(() => {
  const now = new Date()
  return expenses.value
    .filter(e => {
      const d = new Date(e.date)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })
    .reduce((sum, e) => sum + e.amount, 0)
})

const currentMonthStr = computed(() => {
  return new Date().toLocaleDateString("it-IT", { month: "long", year: "numeric" })
})


const chartData = computed(() => {
  const totals = expenses.value.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})

  return Object.entries(totals).map(([cat, amount]) => {
    const info = CATEGORIES.find(c => c.value === cat) || CATEGORIES[6]
    const percentage = totalAmount.value > 0 ? (amount / totalAmount.value) * 100 : 0
    return {
      name: info.label,
      value: amount,
      color: info.color,
      percentage: percentage
    }
  }).sort((a, b) => b.value - a.value)
})
</script>

<template>
  <div class="dashboard-container">
    <h2>Pagina 3: Dashboard Statistiche</h2>

    <div class="stats-grid">
      <div class="card" :class="{ 'danger-bg': budgetRimanente < 0 }">
        <div class="card-header"><span>Budget Rimanente</span><span class="icon">⚖️</span></div>
        <div class="card-value" :style="{ color: budgetRimanente >= 0 ? '#10b981' : '#ef4444' }">
          {{ budgetRimanente.toFixed(2) }} €
        </div>
        <p class="card-sub">Su un budget iniziale di {{ budgetIniziale.toFixed(2) }} €</p>
      </div>

      <div class="card">
        <div class="card-header"><span>Spesa Totale</span><span class="icon">💰</span></div>
        <div class="card-value">{{ totalAmount.toFixed(2) }} €</div>
        <p class="card-sub">{{ expenses.length }} transazioni</p>
      </div>

      <div class="card">
        <div class="card-header"><span>Questo Mese</span><span class="icon">📅</span></div>
        <div class="card-value">{{ monthTotal.toFixed(2) }} €</div>
        <p class="card-sub text-capitalize">{{ currentMonthStr }}</p>
      </div>

      <div class="card">
        <div class="card-header"><span>Media per Spesa</span><span class="icon">📈</span></div>
        <div class="card-value">{{ averageAmount.toFixed(2) }} €</div>
        <p class="card-sub">Per transazione</p>
      </div>
    </div>

    <div class="chart-section card" v-if="chartData.length > 0">
      <h3>Ripartizione per categoria</h3>
      <div class="chart-list">
        <div v-for="item in chartData" :key="item.name" class="chart-row">
          <div class="row-info">
            <span class="category-name">{{ item.name }}</span>
            <span class="category-values">
              <strong>{{ item.value.toFixed(2) }} €</strong> ({{ item.percentage.toFixed(0) }}%)
            </span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" :style="{ width: item.percentage + '%', backgroundColor: item.color }"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="card empty-state">
      <p>Nessun dato disponibile. Vai nella pagina "Gestione Portafoglio" per aggiungere delle spese!</p>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container { display: flex; flex-direction: column; gap: 25px; font-family: sans-serif; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
.card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
.danger-bg { border-color: #fca5a5; background-color: #fef2f2; }
.card-header { display: flex; justify-content: space-between; color: #64748b; font-size: 14px; font-weight: 600; margin-bottom: 10px; }
.card-value { font-size: 26px; font-weight: 700; color: #0f172a; }
.card-sub { font-size: 12px; color: #64748b; margin: 5px 0 0 0; }
.text-capitalize { text-transform: capitalize; }
.chart-section { margin-top: 10px; }
.chart-list { display: flex; flex-direction: column; gap: 15px; }
.chart-row { display: flex; flex-direction: column; gap: 6px; }
.row-info { display: flex; justify-content: space-between; font-size: 14px; }
.category-name { font-weight: 500; }
.progress-bar-bg { width: 100%; height: 8px; background-color: #f1f5f9; border-radius: 4px; overflow: hidden; }
.progress-bar-fill { height: 100%; border-radius: 4px; transition: width 0.3s ease; }
.empty-state { text-align: center; color: #64748b; padding: 30px; }
</style>