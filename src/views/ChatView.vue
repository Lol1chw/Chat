<script setup lang="ts">
import MessagesList from '@/components/messagesList.vue'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'

const store = useAuthenticationStore()
</script>

<template>
  <div class="about">
    <MessagesList />
    <button @click="store.logOut">Log out</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
