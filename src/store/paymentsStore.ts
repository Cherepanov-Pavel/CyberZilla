import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { BASE_URL } from '@/consts/API'

enum Currency {
  Usd = 'USD',
  Rub = 'RUB',
  Left = 'LEFT',
  Right = 'RIGHT',
}
export interface Payment {
  currency: Currency, 
  count: number,
}

// const mockData: Payment[] = new Array(30).fill([]).map(() => [])


export const usePaymentsStore = defineStore('payments', () => {
  const payments: Ref<Payment[] | []> = ref([])
  const loading: Ref<boolean> = ref(false)
  async function getPayments() {
    loading.value = true
    payments.value = await(await fetch(`${BASE_URL}/users`)).json()
    loading.value = false
  }
  return { payments, getPayments, }
//   async function updateTasks(task: Task) {
//     fetch(`${BASE_URL}/users/${user.id}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(user)
//     })
})
