<script setup lang="ts">
import MoonDarkThemeIcon from '@/assets/moon-dark-theme-icon.vue'
import SunThemeIcon from '@/assets/sun-theme-icon.vue'
import SystemThemeIcon from '@/assets/system-theme-icon.vue'
import { useThemeStore } from '@/stores/theme'
import { Themes } from '@/stores/theme'
import { computed } from 'vue'

const ThemesWithIcons = {
  Light: {
    color: Themes.LIGHT,
    icon: SunThemeIcon
  },
  Dark: {
    color: Themes.DARK,
    icon: MoonDarkThemeIcon
  },
  System: {
    color: Themes.SYSTEM,
    icon: SystemThemeIcon
  }
}

const store = useThemeStore()

const iconTheme = computed(() => {
  if (store.themes === 'Dark') {
    return MoonDarkThemeIcon
  }
  if (store.themes === 'Light') {
    return SunThemeIcon
  } else {
    return SystemThemeIcon
  }
})
</script>

<template>
  <button :class="$style['button-theme']" @click="store.toggleDropdown">
    <component :is="iconTheme"></component>
  </button>

  <ul v-if="store.showDropdown" :class="$style.list" role="list">
    <template v-for="theme in ThemesWithIcons" :key="theme.color">
      <li
        :class="store.themes === theme.color ? $style['list-item--active'] : $style['list-item']"
        role="option"
        :value="theme.color"
        @click="store.toggleTheme(theme.color)"
      >
        <component :is="theme.icon" />
        {{ theme.color }}
      </li>
    </template>
  </ul>
</template>

<style module>
.button-theme {
  background-color: #ffffff00;
  border-color: #ffffff00;
  cursor: pointer;
}

.button-theme path {
  fill: var(--primary-main);
}

.list {
  padding: 0;
  width: fit-content;
  list-style: none;
}

.list-item {
  background-color: var(--color-background-paper);
  color: var(--text-color);
  display: flex;
  gap: 5px;
  padding: 5px;
  max-width: 100px;
  text-align: center;
  cursor: pointer;
}

.list-item:hover {
  background-color: #0000000a;
}

.list-item--active {
  composes: list-item;
  background-color: #0000000a;
  color: var(--primary-main);
}

.list-item--active path {
  fill: var(--primary-main);
}

.list-item:first-child {
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
}
.list-item:last-child {
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
}
</style>
