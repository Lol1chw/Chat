import type { Message } from '@/types/message'
import { defineStore } from 'pinia'
import { ref } from 'vue'

function createMessage(): Message {
  const UUID = self.crypto.randomUUID()
  const r = (Math.random() + 1).toString(36).substring(7)
  return {
    id: UUID,
    author: {
      id: UUID,
      name: r
    },
    content: Math.random().toString(),
    time: Date.now()
  }
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>(Array.from({ length: 5 }, createMessage))

  function addMessage() {
    messages.value.push(createMessage())
  }

  return {
    messages,
    addMessage
  }
})
