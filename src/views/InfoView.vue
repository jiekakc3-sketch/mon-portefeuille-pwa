<template>
  <div class="info-container">
    <h2>Informazioni & Regole dell'App ℹ️</h2>
    <p class="intro">Benvenuto nella guida all'utilizzo della tua Progressive Web App per la gestione delle finanze personali.</p>

    <div class="rules-grid">
      <div class="rule-card">
        <div class="rule-icon">💰</div>
        <h3>1. Il Budget Iniziale</h3>
        <p>Tutto inizia nella pagina di <strong>Benvenuto</strong>. Devi impostare una cifra iniziale che rappresenta i tuoi fondi disponibili. Puoi modificarla in qualsiasi momento se commetti un errore.</p>
      </div>

      <div class="rule-card">
        <div class="rule-icon">📝</div>
        <h3>2. Gestione Spese (CRUD)</h3>
        <p>Nella sezione <strong>Gestione Portafoglio</strong> puoi aggiungere nuove spese indicando l'importo, la categoria, una descrizione e la data. Da lì puoi anche modificare o eliminare ogni singola transazione.</p>
      </div>

      <div class="rule-card">
        <div class="rule-icon">📊</div>
        <h3>3. Monitoraggio & Dashboard</h3>
        <p>La <strong>Dashboard</strong> calcola automaticamente l'andamento delle tue finanze. Vedrai la spesa totale, la media per transazione, quanto hai speso nel mese corrente e una barra di progressione per ogni categoria.</p>
      </div>

      <div class="rule-card">
        <div class="rule-icon">🔒</div>
        <h3>4. Salvataggio Locale & PWA</h3>
        <p>I tuoi dati sono al sicuro e non vengono inviati a nessun server esterno. L'applicazione utilizza il <strong>localStorage</strong> del tuo browser. Inoltre, essendo una PWA, potrai presto installarla sul tuo telefono per usarla offline!</p>
      </div>
    </div>

    <div class="footer-note">
      <p>Progetto realizzato per l'esame di <strong>Fondamenti di Sistemi Web</strong> - Università di Bologna (Campus di Cesena).</p>
    </div>
  </div>
</template>

<style scoped>
.info-container {
  max-width: 800px;
  margin: 30px auto;
  font-family: sans-serif;
  color: #0f172a;
}
h2 { text-align: center; margin-bottom: 10px; }
.intro { text-align: center; color: #64748b; font-size: 16px; margin-bottom: 40px; }

.rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
.rule-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.rule-icon { font-size: 30px; margin-bottom: 10px; }
.rule-card h3 { margin: 0 0 10px 0; font-size: 18px; color: #0f172a; }
.rule-card p { margin: 0; font-size: 14px; color: #475569; line-height: 1.6; }

.footer-note {
  margin-top: 5px;
  text-align: center;
  border-top: 1px solid #e2e8f0;
  padding-top: 20px;
  color: #94a3b8;
  font-size: 12px;
}
</style>