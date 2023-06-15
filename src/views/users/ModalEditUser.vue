<script setup lang="ts">
import { useUsersStore } from '@/store/usersStore'
import { storeToRefs } from 'pinia'
import { watchEffect, ref } from 'vue'
import { type User } from '@/store/usersStore'
import { reactive } from 'vue'

defineProps<{
  selectedUser: User | undefined
}>()
const store = useUsersStore()

const { users } = storeToRefs(store)
const { updateUser } = store

const rules = {
  required: (value: string) => !!value || 'This field is required',
  email: (value: string) => /.+@.+\..+/.test(value) || 'Must be a valid email'
}
</script>
<template>
  <v-dialog class="edit-modal">
    <v-card>
      <v-card-title class="headline black" primary-title>Edit user</v-card-title>
      <v-card-text class="pa-5">
        <v-form>
          <v-text-field
            type="email"
            v-model="selectedUser.email"
            label="Email"
            :rules="[rules.required, rules.email]"
          />
          <v-text-field
            type="text"
            v-model="selectedUser.name"
            label="Name"
            :rules="[rules.required]"
          />
          <v-text-field
            type="text"
            label="Phone"
            v-model="selectedUser.phone"
            :rules="[rules.required]"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn class="ml-auto" @click="() => updateUser(selectedUser)" outlined color="primary"
          >Send</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="sass">
.edit-modal
  width: 500px
  height: 600px
</style>
