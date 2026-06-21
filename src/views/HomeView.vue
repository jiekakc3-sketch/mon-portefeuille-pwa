<script setup>
import { ref } from 'vue'


const budgetSalvato = localStorage.getItem('pwa_budget')
const budgetInput = ref(budgetSalvato || '')
const budgetDefinito = ref(!!budgetSalvato) // Diventa true se il budget esiste già


const salvaBudget = () => {
  if (!budgetInput.value || budgetInput.value <= 0) return
  
  localStorage.setItem('pwa_budget', budgetInput.value)
  budgetDefinito.value = true
}


const resettaBudget = () => {
  localStorage.removeItem('pwa_budget')
  budgetInput.value = ''
  budgetDefinito.value = false
}
</script>

<template>
  <div class="welcome-container">
    <h1>Benvenuto nel tuo Portafoglio PWA 💰</h1>
    <p class="subtitle">Gestisci le tue finanze personali in modo semplice, veloce e moderno.</p>

    <div v-if="!budgetDefinito" class="card setup-card">
      <h3>Imposta il tuo Budget Iniziale</h3>
      <p>Inserisci la cifra totale che hai a disposizione per iniziare a tracciare le tue spese quotidiane.</p>
      
      <form @submit.prevent="salvaBudget" class="budget-form">
        <div class="input-group">
          <input 
            type="number" 
            step="0.01" 
            placeholder="Es: 1500.00" 
            v-model="budgetInput" 
            required 
          />
          <span class="currency">€</span>
        </div>
        <button type="submit" class="btn-primary">Inizia a gestire</button>
      </form>
    </div>

    <div v-else class="card success-card">
      <h3>Budget Impostato! 🎉</h3>
      <p>Il tuo budget iniziale attuale è di:</p>
      <div class="budget-display">{{ parseFloat(budgetInput).toFixed(2) }} €</div>
      
      <p class="next-steps">
        Ora puoi andare nella sezione <strong>"Gestione Portafoglio"</strong> per aggiungere le tue spese, 
        oppure controllare la <strong>"Dashboard"</strong> per vedere le statistiche aggiornate.
      </p>
      
      <button @click="resettaBudget" class="btn-secondary">Modifica Budget</button>
    </div>
  </div>
</template>

<style scoped>
.welcome-container { max-width: 600px; margin: 40px auto; text-align: center; font-family: sans-serif; }
h1 { color: #0f172a; margin-bottom: 10px; }
.subtitle { color: #64748b; font-size: 16px; margin-bottom: 30px; }
.card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
h3 { margin-top: 0; color: #0f172a; font-size: 20px; }
p { color: #475569; font-size: 14px; line-height: 1.5; }
.budget-form { margin-top: 20px; display: flex; flex-direction: column; gap: 15px; }
.input-group { position: relative; display: flex; align-items: center; max-width: 300px; margin: 0 auto; width: 100%; }
.input-group input { width: 100%; padding: 12px 40px 12px 16px; font-size: 18px; border: 2px solid #cbd5e1; border-radius: 8px; outline: none; }
.input-group input:focus { border-color: #0f172a; }
.currency { position: absolute; right: 16px; font-size: 18px; font-weight: bold; color: #64748b; }
button { padding: 12px 24px; font-size: 16px; font-weight: 600; border-radius: 8px; cursor: pointer; border: none; }
.btn-primary { background-color: #0f172a; color: white; margin: 0 auto; width: 100%; max-width: 300px; }
.btn-secondary { background-color: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; font-size: 14px; padding: 8px 16px; }
.budget-display { font-size: 36px; font-weight: 800; color: #10b981; margin: 20px 0; }
.next-steps { margin-top: 20px; margin-bottom: 25px; color: #64748b; font-style: italic; }
</style>