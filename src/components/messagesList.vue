<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
import { ref } from 'vue'
import type { Message } from '@/types/message'
import MessageMenu from './messageMenu.vue';
import { useMessageMenuStore } from '@/stores/messageMenu';

const { addMessage, deleteMessage, editMessage, messageStorage } = useChatStore()
const store = useMessageMenuStore()

const content = ref('')

function sendMessage() {
  addMessage(content.value)
  content.value = ''
}

function handleEditMessage() {
  if (store.selectedMessage) {
    const newText = window.prompt('Enter new message text', store.selectedMessage.content)
    if (newText !== null) {
      editMessage(store.selectedMessage, newText)
    }
    store.showMessageMenu = false
  }
}

</script>

<template>
  <div :class="$style.sendMessage">
    <input v-model="content" @keyup.enter="sendMessage" />
    <button :disabled="content.length < 1" @click="sendMessage">Send message</button>
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
  @handle-edit-message="handleEditMessage"/>
</template>

<style module>
.sendMessage {
  display: flex;
}
</style>
