<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'

const items = [
  { text: 'Users', to: '/users' },
  { text: 'Payments', to: '/payments' }
]
</script>
<template>
  <header>
    <router-link v-for="{ to, text } in items" :to="to">
      <AppButton>
        {{ text }}
      </AppButton>
    </router-link>
  </header>
</template>

<style scoped lang="sass">
header
  display: flex
  justify-content: center
  gap: 20px
  padding-bottom: 20px
  width: 100vw
</style>
