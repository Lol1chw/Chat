<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { Themes } from '@/stores/theme'
const store = useThemeStore()
</script>

<template>
    <select v-model="store.themes" @change="store.toggleTheme">
        <option :value="Themes.DARK" >{{ Themes.DARK }}</option>
        <option :value="Themes.SYSTEM" >{{ Themes.SYSTEM }}</option>
        <option :value="Themes.LIGHT" >{{ Themes.LIGHT }}</option>
    </select>
</template>

<style module>
</style>
