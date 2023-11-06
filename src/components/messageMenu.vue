<script setup lang="ts">
import { useMessageMenuStore } from '@/stores/messageMenu'
import type { Message } from '@/types/message'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const store = useMessageMenuStore()

defineEmits<{
  (e: 'deleteMessage', selectedMessage: Message): void
  (e: 'handleEditMessage'): void
}>()

const { showMessageMenu } = storeToRefs(store)

function onClose() {
  showMessageMenu.value = false
}

function handleEscapePress(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    onClose()
  }
}

watch(showMessageMenu, (showMessageMenu) => {
  if (showMessageMenu) {
    window.addEventListener('click', onClose)
    window.addEventListener('keydown', handleEscapePress)
  } else if (showMessageMenu === false) {
    window.removeEventListener('click', onClose)
    window.addEventListener('keydown', handleEscapePress)
  }
})
</script>

<template>
  <div
    v-if="store.showMessageMenu"
    :style="{ top: `${store.messageMenuY + 15}px`, left: `${store.messageMenuX}px` }"
    :class="$style['message-menu']"
  >
    <ul :class="$style['message-menu-list']">
      <li>
        <button
          :class="$style['message-button']"
          @click="
            store.selectedMessage && $emit('deleteMessage', store.selectedMessage),
              (store.showMessageMenu = false)
          "
        >
          Delete Message
        </button>
      </li>
      <hr />
      <li>
        <button :class="$style['message-button']" @click="$emit('handleEditMessage')">Edit</button>
      </li>
    </ul>
  </div>
</template>

<style module>
.message-button {
  outline: none;
  border: none;
  background-color: var(--color-background-paper);
  cursor: pointer;
  color: var(--text-color);
  width: 100%;
}

.message-button:hover {
  filter: opacity(0.6);
}

.message-menu {
  position: absolute;
  background-color: var(--color-background);
  border: 1px solid #ccc;
  z-index: 100;
}

.message-menu-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-paper);
  text-align: center;
}

.message-menu li {
  display: flex;
}
</style>
