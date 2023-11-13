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
  <div :class="$style['send-message']">
    <input v-model="content" @keyup.enter="addMessage" />
    <button
      :class="content.length < 1 && $style['button--disabled']"
      :disabled="content.length < 1"
      @click="addMessage"
    >
      Send message
    </button>
  </div>

  <ul :class="$style['message-list']">
    <template v-for="message in messageStorage" :key="message.id">
      <li
        :class="
          message === store.selectedMessage
            ? [$style['message-list__message'], $style['selected--message']]
            : $style['message-list__message']
        "
        @contextmenu.prevent="store.openMessageMenu(message, $event)"
      >
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
.send-message {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: fit-content;
}

.button--disabled {
  filter: opacity(0.5);
}

.message-list {
  list-style: none;
  padding: 0;
  margin: 10px 0px 10px 0px;
}

.message-list__message {
  word-wrap: break-word;
  max-width: 500px;
}
.selected--message {
  filter: opacity(0.5);
}
</style>
