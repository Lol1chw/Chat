<script setup lang="ts">
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import type { Invalid, User } from '@/types/auth'
import { ref } from 'vue'
import router from '@/router/index'

const user = ref<User>({ name: '', password: '', isAuth: false })
const invalid = ref<Invalid>({ name: false, password: false })
const helperText = ref<Omit<User, 'isAuth'>>({ name: '', password: '' })

const store = useAuthenticationStore()

defineProps<{ mode: 'login' | 'register' }>()

function submit(event: Event, mode: 'login' | 'register') {
  event.preventDefault()

  const foundName = store.isAuthentication.find((obj) => obj.name === user.value.name)

  if (mode === 'register') {
    if (user.value.name.length < 2) {
      invalid.value.name = true
      helperText.value.name = 'The name must contain at least 2 characters'
    } else if (foundName) {
      invalid.value.name = true
      helperText.value.name = 'A user with this name is already registered'
    } else {
      invalid.value.name = false
      helperText.value.name = ''
    }
    if (user.value.password.length < 1) {
      invalid.value.password = true
      helperText.value.password = 'The password must contain at least 5 characters'
    } else {
      invalid.value.password = false
      helperText.value.password = ''
    }
    if (!invalid.value.name && !invalid.value.password) {
      store.addUser(user.value)
      invalid.value.name = false
      router.push('/login')
    }
  } else if (mode === 'login') {
    if (!foundName) {
      invalid.value.name = true
      helperText.value.name = 'The user with this name does not exist'
    }
    if (user.value.password.length < 1) {
      invalid.value.password = true
      helperText.value.password = 'Incorrect password'
    } else {
      invalid.value.password = false
      helperText.value.password = ''
    }
    if (foundName) {
      const data: User[] = JSON.parse(localStorage.getItem('authentication') as string)
      for (const [key, value] of Object.entries(data)) {
        const compareName = value.name === user.value.name
        const comparePass = value.password === user.value.password
        const keyNumber = Number(key)
        if (compareName && comparePass) {
          invalid.value.name = false
          invalid.value.password = false
          helperText.value.name = ''
          helperText.value.password = ''
          store.isAuthentication[keyNumber].isAuth = true
          router.push('/chat/0')
        } else if (compareName && !comparePass) {
          invalid.value.password = true
          helperText.value.password = 'Incorrect password'
        }
      }
    }
  }
}
</script>

<template>
  <form :class="$style.Form">
    <label :class="$style.label">
      Name
      <input v-model="user.name" :class="invalid.name && $style.Invalid" />
    </label>
    <p v-if="invalid" :class="invalid && $style.Error">
      {{ helperText.name }}
    </p>

    <label :class="$style.label">
      Password
      <input v-model="user.password" :class="invalid.password && $style.Invalid" />
    </label>
    <p v-if="invalid" :class="invalid && $style.Error">
      {{ helperText.password }}
    </p>

    <button @click="submit($event, mode)">Submit</button>
  </form>
</template>

<style module>
.label {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-bottom: 16px;
  flex: 1;
}
.Invalid {
  border: 1.5px solid #dc2626;
  border-radius: 4px;
}
.Error {
  font-size: 14px;
  color: #dc2626;
}
</style>
