<script setup lang="ts">
import CreateAccount from '@/components/authentication/authenticationForm.vue'
</script>

<template>
  <div>
    <div :class="$style.Links">
      <RouterLink to="/" :class="$style['Links--active']">Register</RouterLink>
      <RouterLink to="/login">Log in</RouterLink>
    </div>
    <CreateAccount mode="register" helper-text="A user with this name is already registered" />
  </div>
</template>

<style module>
.Links {
  display: flex;
  gap: 15px;
}
.Links--active {
  font-size: 18px;
  border-bottom: 2px solid brown;
}
</style>
