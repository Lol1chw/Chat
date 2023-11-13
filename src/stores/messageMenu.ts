import type { Message } from '@/types/message'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessageMenuStore = defineStore('messageMenu', () => {
  const showMessageMenu = ref(false)
  const messageMenuX = ref(0)
  const messageMenuY = ref(0)
  const selectedMessage = ref<null | Message>(null)

  function openMessageMenu(message: Message, event: MouseEvent) {
    selectedMessage.value = message
    messageMenuX.value = event.clientX
    messageMenuY.value = event.clientY

    if (selectedMessage.value) {
      showMessageMenu.value = !showMessageMenu.value
    }
  }

  return { showMessageMenu, openMessageMenu, messageMenuX, messageMenuY, selectedMessage }
})
