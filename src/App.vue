<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <header class="main-header">
      <div class="logo">💰 PWA Wallet</div>
      <nav class="nav-links">
        <RouterLink to="/" class="nav-item">1. Benvenuto</RouterLink>
        <RouterLink to="/info" class="nav-item">2. Info & Regole</RouterLink>
        <RouterLink to="/dashboard" class="nav-item">3. Dashboard</RouterLink>
        <RouterLink to="/gestione" class="nav-item">4. Gestione</RouterLink>
      </nav>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* Stili globali per resettare la pagina */
body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #f8fafc;
  color: #0f172a;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Stile della Barra di Navigazione superiore */
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #0f172a;
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.logo {
  font-size: 20px;
  font-weight: 700;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-item {
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-item:hover {
  color: white;
  background-color: #1e293b;
}

/* Stile speciale per la pagina attiva nel menu */
.router-link-active {
  color: white !important;
  background-color: #334155;
}

/* Spazio principale per i contenuti */
.main-content {
  flex: 1;
  padding: 40px 30px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>