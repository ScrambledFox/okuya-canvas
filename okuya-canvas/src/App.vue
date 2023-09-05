<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

import { RouterView } from 'vue-router'
import SideMenu from './components/SideMenu.vue'
</script>

<template>
  <div>
    <Splitpanes vertical>
      <Pane minSize="20" maxSize="50">
        <SideMenu />
      </Pane>
      <Pane>
        <RouterView />
      </Pane>
    </Splitpanes>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100vh;
}
</style>
