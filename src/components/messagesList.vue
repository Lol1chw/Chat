<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
import type { Message } from '@/types/message'
import MessageMenu from './messageMenu.vue'
import { useMessageMenuStore } from '@/stores/messageMenu'
import { storeToRefs } from 'pinia'

const { addMessage, deleteMessage, editMessage, messageStorage } = useChatStore()
const chatStore = useChatStore()

const store = useMessageMenuStore()
const { content } = storeToRefs(chatStore)
</script>

<template>
  <div :class="$style.sendMessage">
    <input v-model="content" @keyup.enter="addMessage" />
    <button :disabled="content.length < 1" @click="addMessage">Send message</button>
  </div>

  <ul>
    <template v-for="message in messageStorage" :key="message.id">
      <li @contextmenu.prevent="store.openMessageMenu(message, $event)">
        {{ `${message.author}: ${message.content}` }}
      </li>
    </template>
  </ul>
  <MessageMenu
    @delete-message="deleteMessage(store.selectedMessage as Message)"
    @handle-edit-message="editMessage"
  />
</template>

<style module>
.sendMessage {
  display: flex;
}
</style>
