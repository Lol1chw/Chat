<script setup lang="ts">
import themeList from '@/components/themeList.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div
    :class="route.name !== 'chat' ? $style.header : [$style.header, $style['header--justify-end']]"
  >
    <div v-if="route.name !== 'chat'" :class="$style.header__links">
      <RouterLink :to="{ name: 'home' }"> Register </RouterLink>
      <RouterLink :to="{ name: 'login' }"> Log in </RouterLink>
    </div>
    <div :class="$style.header__theme">
      <themeList />
    </div>
  </div>
  <router-view />
</template>

<style module>
.header {
  display: flex;
  justify-content: space-between;
}

.header__links {
  display: flex;
  gap: 15px;
}

.header--justify-end {
  justify-content: flex-end;
}

.header__theme {
  position: relative;
  padding-right: 30px;
}

@media screen and (max-width: 500px) {
  .header__theme {
    padding-bottom: 20px;
    padding-right: 0px;
  }
}
</style>
