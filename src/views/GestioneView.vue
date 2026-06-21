<script setup>
import { ref, computed, watch } from 'vue'


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
const expenses = ref(datiSalvati ? JSON.parse(datiSalvati) : [])


watch(expenses, (nuoveSpese) => {
  localStorage.setItem('pwa_expenses', JSON.stringify(nuoveSpese))
}, { deep: true })


const sortedExpenses = computed(() => {
  return [...expenses.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})


const amount = ref('')
const category = ref('')
const description = ref('')
const date = ref(new Date().toISOString().split('T')[0]) // Data di oggi come default


const aggiungiSpesa = () => {
  if (!amount.value || !category.value || !description.value || !date.value) return

  const nuovaSpesa = {
    id: Date.now().toString(), // ID unico basato sul timestamp
    amount: parseFloat(amount.value),
    category: category.value,
    description: description.value,
    date: date.value
  }

  expenses.value.push(nuovaSpesa)


  amount.value = ''
  category.value = ''
  description.value = ''
  date.value = new Date().toISOString().split('T')[0]
}


const eliminaSpesa = (id) => {
  expenses.value = expenses.value.filter(exp => exp.id !== id)
}


const getCategoryInfo = (val) => CATEGORIES.find(c => c.value === val) || CATEGORIES[6]
const formatDate = (d) => new Date(d).toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" })
</script>

<template>
  <div class="gestione-container">
    <h2>Pagina 4: Gestione Portafoglio</h2>

    <div class="layout-griglia">
      <form @submit.prevent="aggiungiSpesa" class="card expense-form">
        <h3>Nuova Spesa</h3>
        
        <div class="form-group">
          <label>Importo (€)</label>
          <input type="number" step="0.01" placeholder="0.00" v-model="amount" required />
        </div>

        <div class="form-group">
          <label>Categoria</label>
          <select v-model="category" required>
            <option value="" disabled>Seleziona una categoria</option>
            <option v-for="cat in CATEGORIES" :key="cat.value" :value="cat.value">
              {{ cat.label }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Descrizione</label>
          <input type="text" v-model="description" placeholder="Es: Spesa Coop" required />
        </div>

        <div class="form-group">
          <label>Data</label>
          <input type="date" v-model="date" required />
        </div>

        <button type="submit" class="btn-submit">Aggiungi Spesa</button>
      </form>

      <div class="expense-list">
        <h3>Lista delle Spese</h3>
        
        <div v-if="expenses.length === 0" class="empty-state card">
          <p>Nessuna spesa registrata</p>
          <small>Compila il modulo a sinistra per aggiungere la tua prima spesa.</small>
        </div>

        <div v-else class="card list-item" v-for="expense in sortedExpenses" :key="expense.id">
          <div class="item-info">
            <div class="item-header">
              <span class="badge" :style="{ backgroundColor: getCategoryInfo(expense.category).color }">
                {{ getCategoryInfo(expense.category).label }}
              </span>
              <span class="date">{{ formatDate(expense.date) }}</span>
            </div>
            <p class="description">{{ expense.description }}</p>
          </div>
          
          <div class="item-actions">
            <strong class="amount">-{{ expense.amount.toFixed(2) }} €</strong>
            <button @click="eliminaSpesa(expense.id)" class="btn-delete" title="Elimina">🗑️</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gestione-container {
  font-family: sans-serif;
}
h2 { color: #0f172a; margin-bottom: 20px; }
.layout-griglia {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  align-items: flex-start;
}
.card {
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.expense-form {
  width: 320px;
  flex-shrink: 0;
}
.expense-list {
  flex: 1;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.expense-list h3 { margin-top: 0; color: #0f172a; }
.form-group { margin-bottom: 15px; }
.form-group label { display: block; margin-bottom: 5px; font-size: 14px; font-weight: 600; color: #334155; }
.form-group input, .form-group select {
  width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; box-sizing: border-box; font-size: 14px;
}
.btn-submit {
  background-color: #0f172a; color: white; width: 100%; padding: 12px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 15px; margin-top: 10px;
}
.btn-submit:hover { background-color: #1e293b; }

/* Stili Lista */
.list-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; margin-bottom: 10px; }
.item-header { display: flex; gap: 10px; align-items: center; margin-bottom: 5px; }
.badge { color: white; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
.date { font-size: 12px; color: #64748b; }
.description { margin: 0; font-weight: 500; color: #1e293b; }
.item-actions { display: flex; align-items: center; gap: 15px; }
.amount { font-size: 16px; color: #ef4444; }
.btn-delete { background: none; border: none; font-size: 16px; cursor: pointer; padding: 5px; border-radius: 4px; }
.btn-delete:hover { background: #fee2e2; }
.empty-state { text-align: center; color: #64748b; padding: 40px; }
</style>