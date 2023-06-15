import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { BASE_URL } from '@/consts/API'

export interface Task {
  id: number
  done: boolean
  text: string | null
}

export const useTasksStore = defineStore('tasks', () => {
  const tasks: Ref<Task[] | []> = ref([])
  const loading: Ref<boolean> = ref(false)

  async function getTasks() {
    loading.value = true
    tasks.value = await (await fetch(`${BASE_URL}/users`)).json()
    loading.value = false
  }
  
  async function updateTasks(task: Task) {
    fetch(`${BASE_URL}/users/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })
  }

  return { tasks, getTasks, updateTasks }
})
