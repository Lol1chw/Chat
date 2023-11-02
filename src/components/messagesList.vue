<script setup lang="ts">
import { useChatStore } from '@/stores/chat';

const { messages, addMessage } = useChatStore()
</script>

<template>
        <div>
            <button @click="addMessage">Send message</button>
        </div>
        <ul v-for="message in messages" :key="message.id">
            <li>{{ message.content }}</li>
        </ul>
</template>