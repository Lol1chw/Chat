import type { Message } from '@/types/message'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthenticationStore } from './useAuthenticationStore'
import { useStorage } from '@vueuse/core'
import type { RemovableRef } from '@vueuse/core'
import { useMessageMenuStore } from './messageMenu'

export const useChatStore = defineStore('chat', () => {
  const content = ref('')
  const messages = ref<Message[]>(Array.from({ length: 1 }, createMessage))
  const menuStore = useMessageMenuStore()

  const messageStorage = useStorage('messages', messages)

  function createMessage(): Message {
    const storeAuth = useAuthenticationStore()

    const indexOfAuth = storeAuth.isAuthentication.findIndex((value) => value.isAuth === true)
    const nameAuth = storeAuth.isAuthentication[indexOfAuth].name

    const UUID = self.crypto.randomUUID()
    return {
      id: UUID,
      author: nameAuth,
      content: content.value || 'hi',
      time: Date.now()
    }
  }

  function addMessage() {
    messages.value.push(createMessage())
    content.value = ''
  }

  function deleteMessage(message: Message) {
    const index = messageStorage.value.indexOf(message)
    if (index !== -1) {
      messageStorage.value.splice(index, 1)
    }
  }

  function editMessage() {
    if (menuStore.selectedMessage) {
      const newText = window.prompt('Enter new message text', menuStore.selectedMessage.content)
      if (newText !== null) {
        const index = messageStorage.value.indexOf(menuStore.selectedMessage)
        messageStorage.value[index].content = newText
      }
    }
    menuStore.showMessageMenu = false
  }

  return {
    messageStorage,
    addMessage,
    deleteMessage,
    editMessage,
    content
  }
})
