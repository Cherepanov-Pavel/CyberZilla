<script setup lang="ts">
import AppHeader from './views/common/AppHeader.vue'
import AppFooter from './views/common/AppFooter.vue'
</script>

<template>
  <div class="container">
    <AppHeader />
    <main>
      <router-view></router-view>
    </main>
    <AppFooter />
  </div>
</template>
<style scoped lang="sass">
.container
  display: flex
  flex-direction: column
  height: 100vh
  width: calc(100vw - 40px)
  padding: 20px

main
  padding-top: 20px
</style>
