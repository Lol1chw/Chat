<script setup lang="ts">
import LogIn from '@/components/authentication/authenticationForm.vue'
</script>

<template>
  <div :class="$style.Links">
    <RouterLink :to="{ name: 'home' }"> Register </RouterLink>
    <RouterLink :to="{ name: 'login' }"> Log in </RouterLink>
  </div>
  <LogIn mode="login" />
</template>

<style module>
.Links {
  display: flex;
  gap: 15px;
}
</style>
