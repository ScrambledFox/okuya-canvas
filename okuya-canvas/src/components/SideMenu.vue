<script setup lang="ts">
import Menu from 'primevue/menu'

import { ref } from 'vue'

const items = ref([
  { label: 'New', icon: 'pi pi-fw pi-plus' },
  { label: 'Open', icon: 'pi pi-fw pi-download' },
  { label: 'Undo', icon: 'pi pi-fw pi-refresh' }
])
</script>

<template>
  <div class="wrapper">
    <header>
      <h1>Okuya Data Canvas</h1>
    </header>

    <Menu :model="items"></Menu>

    <nav>
      <router-link to="/">Plan</router-link>
      <router-link to="/test">Test</router-link>
    </nav>
  </div>
</template>

<style scoped>
.wrapper {
  background-color: red;
  padding: 2rem;
  border-right: 2px solid gray;
}

header {
  line-height: 1.5;
}
</style>
