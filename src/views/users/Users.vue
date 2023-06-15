<script setup lang="ts">
import { useUsersStore } from '@/store/usersStore'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import ModalEditUser from './ModalEditUser.vue'
import ModalTodoList from './ModalTodoList.vue'
import Loader from '@/components/Loader.vue'
import type { User } from '@/store/usersStore'
import type { Ref } from 'vue'

const store = useUsersStore()
const { users, loading } = storeToRefs(store)

const { getUsers } = store
try {
  getUsers()
} catch (e) {
  console.log(e)
}

const selectedUser: Ref<User | undefined> = ref()
const isEditUserModalOpen: Ref<boolean> = ref(false)
function editUset(user: User) {
  isEditUserModalOpen.value = true
  selectedUser.value = user
}

const isTodoListModalOpen: Ref<boolean> = ref(false)
function workWithTodoList(user: User) {
  isTodoListModalOpen.value = true
  selectedUser.value = user
}

const page = ref(1)
const usersPerPage = ref(10)
const pageCount = computed(() => Math.ceil(users.value.length / usersPerPage.value))
const pagedUsers = computed(() => users.value.slice(page.value - 1, usersPerPage.value))
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
      <tr v-for="user in pagedUsers" :key="user.id">
        <td class="user-table">{{ user.email }}</td>
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
