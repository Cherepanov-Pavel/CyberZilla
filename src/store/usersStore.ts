import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { BASE_URL } from '@/consts/API'

export interface User {
  id: number
  name: string
  email: string
  phone: string
}

export const useUsersStore = defineStore('users', () => {
  const users: Ref<User[] | []> = ref([])
  const loading: Ref<boolean> = ref(false)

  async function getUsers() {
    loading.value = true
    const data = (await (await fetch(`${BASE_URL}/users`)).json()).map(
      ({id,name,email, phone}: User) => ({id, name, email, phone})
    )
    // just for more data
    users.value = data.concat(data).concat(data)
    loading.value = false
  }
  try {
    getUsers()
  } catch (err) {
    console.log(err)
    throw err
  }

  async function updateUser(user: User) {
    try{
      fetch(`${BASE_URL}/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
    } catch(err){
      console.log(err)
      throw err
    }
  }

  return { users, loading, getUsers, updateUser }
})
