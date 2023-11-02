import type { User } from '@/types/auth'
import { useStorage } from '@vueuse/core'
// I use an explicit type because otherwise a typing bug appears
// https://github.com/vueuse/vueuse/issues/1496
import type { RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthenticationStore = defineStore('authentication', () => {
  const users = ref<User[]>(JSON.parse(localStorage.getItem('authentication') as string))

  if (!users.value) {
    users.value = []
  }
  
  const isAuth = useStorage('isAut', true)
  const isAuthentication = useStorage('authentication', users)

  function addUser(data: User) {
    isAuthentication.value.push(data)
  }

  return { isAuthentication, users, addUser, isAuth }
})