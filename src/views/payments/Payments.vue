<script setup lang="ts">
import { usePaymentsStore } from '@/store/paymentsStore'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import Loader from '@/components/Loader.vue'
import { type User } from '@/store/usersStore'
import type { Ref } from 'vue'

const store = usePaymentsStore()

const { users, loading } = storeToRefs(store)
const { getUsers } = store
getUsers()

const selectedUser: Ref<User | undefined> = ref()

const isEditUserModalOpen = ref(false)
function editUset(user: User) {
  isEditUserModalOpen.value = true
  selectedUser.value = user
}

const isTodoListModalOpen = ref(false)
function workWithTodoList(user: User) {
  isTodoListModalOpen.value = true
  selectedUser.value = user
}

const page = ref(1)
const pageCount = computed(() => Math.ceil(users.value.length / 10))
</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Email</th>
        <th class="text-left">Name</th>
        <th class="text-left">Phone</th>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.email }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.phone }}</td>
        <td class="actions-cell">
          <v-icon color="black" icon="mdi-pencil" @click="editUset(user)" />
          <v-icon color="black" icon="mdi-tooltip-check" @click="workWithTodoList(user)" />
        </td>
      </tr>
    </tbody>
    <Loader v-if="loading" />
  </v-table>
  <v-pagination class="table-pagination" v-model="page" :length="pageCount" />

  <ModalEditUser v-model="isEditUserModalOpen" :selectedUser="selectedUser" />
  <ModalTodoList v-model="isTodoListModalOpen" :selectedUser="selectedUser" />
</template>

<style lang="sass">

table
  position: relative
  height: 575.96px

.table-pagination
  padding-top: 20px

.actions-cell
  display: flex
  gap: 1.6rem
  align-items: center
</style>
