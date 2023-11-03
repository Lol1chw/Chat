import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export enum Themes {
  SYSTEM = 'system',
  DARK = 'dark',
  LIGHT = 'light'
}

export const useThemeStore = defineStore('theme', () => {
  const savedTheme = localStorage.getItem('theme') as Themes
  const themes = ref<Themes>(savedTheme || Themes.SYSTEM)

  const themeStorage = useStorage('theme', themes)
  const showDropdown = ref(false)
  function useDefaultTheme() {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (systemTheme && themeStorage.value === Themes.SYSTEM) {
      document.body.className = Themes.DARK
    } else {
      document.body.className = themeStorage.value
    }
  }

  useDefaultTheme()

  function toggleTheme() {
    document.body.className = themeStorage.value
    useDefaultTheme()
    console.log(themeStorage.value)
  }

  function toggleDropdown() {
    showDropdown.value = !showDropdown.value
  }
  return { themes, toggleTheme, showDropdown, toggleDropdown }
})
