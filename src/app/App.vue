<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useStoriesStore } from '@/app/stores/storiesStore'
const storiesStore = useStoriesStore()

const isRefresh = computed(() => storiesStore.isLoadStoriesId)
</script>

<template>
  <div class="w-screen h-screen">
    <nav class="w-full">
      <RouterLink to="/">
        Home
      </RouterLink>
      <div class="flex items-center justify-end">
        <button 
          :disabled="isRefresh" 
          @click="storiesStore.fetchStories" 
          class="refresh-btn"
        >
          <img width="30" src="../app/assets/image/infinite-spinner.svg" v-if="isRefresh">
          <span v-else>Refresh</span>
        </button>
      </div>
    </nav>
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
nav {
  @apply flex flex-wrap items-center justify-between px-5 py-3 bg-blue-500;
  a {
    @apply text-sm font-bold leading-relaxed py-2 whitespace-nowrap uppercase;
    color: white !important;
    &:hover {
      color: #e5e7eb !important;
    }
  }
  .refresh-btn {
    @apply bg-transparent px-3 py-1 text-xs outline-none focus:outline-none;
    span {
      @apply text-white hover:text-gray-200 transition-all duration-150 font-bold uppercase;
    }
  }
}
</style>
