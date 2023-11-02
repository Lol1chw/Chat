<script setup lang="ts">
import MessagesList from '@/components/messagesList.vue';

</script>

<template>
  <div class="about">
    <MessagesList />
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
