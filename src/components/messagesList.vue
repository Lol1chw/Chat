<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
import { ref, watch } from 'vue'
import type { Message } from '@/types/message'

const { addMessage, deleteMessage, editMessage, messageStorage } = useChatStore()

const content = ref('')
const showContextMenu = ref(false)
const contextMenuX = ref(0)
const contextMenuY = ref(0)
const selectedMessage = ref<null | Message>(null)

function sendMessage() {
  addMessage(content.value)
  content.value = ''
}

function openContextMenu(message: Message, event: MouseEvent) {
  selectedMessage.value = message
  contextMenuX.value = event.clientX
  contextMenuY.value = event.clientY

  if (selectedMessage.value) {
    showContextMenu.value = !showContextMenu.value
  }
}

function handleEditMessage() {
  if (selectedMessage.value) {
    const newText = window.prompt('Введите новый текст сообщения', selectedMessage.value.content)
    if (newText !== null) {
      editMessage(selectedMessage.value, newText)
    }
    showContextMenu.value = false
  }
}

function onClose() {
  showContextMenu.value = false
}

function handleEscapePress(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    onClose()
  }
}

watch(showContextMenu, (showContextMenu) => {
  if (showContextMenu) {
    window.addEventListener('click', onClose)
    window.addEventListener('keydown', handleEscapePress)
  } else if (showContextMenu === false) {
    window.removeEventListener('click', onClose)
    window.addEventListener('keydown', handleEscapePress)
  }
})
</script>

<template>
  <div :class="$style.sendMessage">
    <input v-model="content" @keyup.enter="sendMessage" />
    <button :disabled="content.length < 1" @click="sendMessage">Send message</button>
  </div>

  <ul>
    <template v-for="message in messageStorage" :key="message.id">
      <li @contextmenu.prevent="openContextMenu(message, $event)">
        {{ `${message.author}: ${message.content}` }}
      </li>
    </template>
  </ul>

  <div
    v-if="showContextMenu"
    :style="{ top: `${contextMenuY + 15}px`, left: `${contextMenuX}px` }"
    :class="$style['context-menu']"
  >
    <ul :class="$style['context-menu-list']">
      <li>
        <button
          :class="$style['context-button']"
          @click="selectedMessage && deleteMessage(selectedMessage), (showContextMenu = false)"
        >
          Delete Message
        </button>
      </li>
      <hr />
      <li>
        <button :class="$style['context-button']" @click="handleEditMessage">Edit</button>
      </li>
    </ul>
  </div>
</template>

<style module>
.context-button {
  outline: none;
  border: none;
  background-color: var(--color-background-paper);
  cursor: pointer;
  color: var(--text-color);
  width: 100%;
}

.context-button:hover {
  filter: opacity(0.6);
}
.sendMessage {
  display: flex;
}

.context-menu {
  position: absolute;
  background-color: var(--color-background);
  border: 1px solid #ccc;
  z-index: 100;
}

.context-menu-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-paper);
  text-align: center;
}

.context-menu li {
  display: flex;
}
</style>
