<script setup lang="ts">
import { useUsersStore } from '@/store/usersStore'
import { storeToRefs } from 'pinia'
import { watchEffect, ref, computed } from 'vue'
import { type User } from '@/store/usersStore'
import { reactive } from 'vue'
import type { Ref } from 'vue'
import { useTasksStore, type Task } from '@/store/tasksStore'

defineProps<{
  selectedUser: User | undefined
}>()
const store = useTasksStore()

const { tasks } = storeToRefs(store)
store.updateTasks

const rules = {
  required: (value: string) => !!value || 'This field is required',
  email: (value: string) => /.+@.+\..+/.test(value) || 'Must be a valid email'
}

const user = reactive({
  email: '',
  name: '',
  phone: ''
})

const newTask: Ref<string> = ref('')

const completedTasks = computed(() => tasks.value.filter((task) => task.done).length)
const progress = computed(() => (completedTasks.value / tasks.value.length) * 100)
const remainingTasks = computed(() => tasks.value.length - completedTasks.value)

function create() {
  newTask.value = ''
}
</script>
<template>
  <v-dialog width="500">
    <v-card>
      <v-card-title class="headline black" primary-title>User todo list</v-card-title>
      <v-card-text class="pa-5">
        <v-container>
          <v-text-field
            v-model="newTask"
            label="What are you working on?"
            variant="solo"
            @keydown.enter="create"
          >
            <template v-slot:append-inner>
              <v-fade-transition>
                <v-btn
                  v-show="newTask"
                  icon="mdi-plus-circle"
                  variant="text"
                  @click="create"
                ></v-btn>
              </v-fade-transition>
            </template>
          </v-text-field>

          <h2 class="text-h4 text-success">
            Tasks:
            <v-fade-transition leave-absolute>
              <span :key="`tasks-${tasks.length}`">
                {{ tasks.length }}
              </span>
            </v-fade-transition>
          </h2>

          <v-divider class="mt-4"></v-divider>

          <v-row class="my-1">
            <strong class="mx-4 text-info-darken-2 d-flex align-center">
              Remaining: {{ remainingTasks }}
            </strong>

            <v-divider vertical></v-divider>

            <strong class="mx-4 text-success-darken-2 d-flex align-center">
              Completed: {{ completedTasks }}
            </strong>

            <v-spacer></v-spacer>

            <v-progress-circular v-model="progress" class="me-2"></v-progress-circular>
          </v-row>

          <v-divider class="mb-4"></v-divider>

          <v-card v-if="tasks.length > 0">
            <v-slide-y-transition class="py-0" group tag="v-list">
              <template v-for="(task, i) in tasks" :key="`${i}-${task.text}`">
                <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

                <v-list-item @click="task.done = !task.done">
                  <template #prepend>
                    <v-checkbox-btn v-model="task.done" color="grey"></v-checkbox-btn>
                  </template>

                  <v-list-item-title>
                    <span :class="task.done ? 'text-grey' : 'text-primary'">{{ task.text }}</span>
                  </v-list-item-title>

                  <template #append>
                    <v-expand-x-transition>
                      <v-icon v-if="task.done" color="success"> mdi-check </v-icon>
                    </v-expand-x-transition>
                  </template>
                </v-list-item>
              </template>
            </v-slide-y-transition>
          </v-card>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="sass"></style>
