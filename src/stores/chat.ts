import type { Message } from '@/types/message'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthenticationStore } from './useAuthenticationStore'
import { useStorage } from '@vueuse/core'
import type { RemovableRef } from '@vueuse/core'

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>(Array.from({ length: 1 }, createMessage))

  const messageStorage = useStorage('messages', messages)

  function createMessage(text: string): Message {
    const storeAuth = useAuthenticationStore()

    const indexOfAuth = storeAuth.isAuthentication.findIndex((value) => value.isAuth === true)
    const nameAuth = storeAuth.isAuthentication[indexOfAuth].name

    const UUID = self.crypto.randomUUID()
    return {
      id: UUID,
      author: nameAuth,
      content: text || 'hi',
      time: Date.now()
    }
  }

  function addMessage(text: string) {
    messages.value.push(createMessage(text))
  }

  function deleteMessage(message: Message) {
    const index = messageStorage.value.indexOf(message)
    if (index !== -1) {
      messageStorage.value.splice(index, 1)
    }
  }

  function editMessage(message: Message, newText: string) {
    const index = messageStorage.value.indexOf(message)

    messageStorage.value[index].content = newText
  }

  return {
    messageStorage,
    addMessage,
    deleteMessage,
    editMessage
  }
})
