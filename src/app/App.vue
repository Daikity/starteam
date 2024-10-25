<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView, useRoute, type RouteRecordNameGeneric } from 'vue-router'
import { useStoriesStore } from '@/app/stores/storiesStore'
import { useCommentsStore } from '@/app/stores/commentsStore'
import type { Story } from './types';
const storiesStore = useStoriesStore()
const commentsStore = useCommentsStore()

const route = useRoute()

const isRefresh = ref<boolean>(false)

const onRefresh = async (routName: RouteRecordNameGeneric): Promise<void> => {
  isRefresh.value = true
  switch (routName) {
    case 'home':
      storiesStore.fetchStories()
      break;
    case 'story':
      try {
        const story: Story = await storiesStore.fetchOnceStory(Number(route.params.id))
        commentsStore.buildCommentsTree(story.kids)
      } catch (error) {
        console.error(error)
      } finally {
        isRefresh.value = false
        break;
      }
  }
}


</script>

<template>
  <div class="w-screen h-screen">
    <nav class="w-full">
      <div>
        <RouterLink v-if="route.name !== 'home'" to="/">
          Back to home
        </RouterLink>
      </div>
      <div class="flex items-center justify-end">
        <button 
          :disabled="isRefresh" 
          @click="onRefresh(route.name)" 
          class="refresh-btn"
        >
          <img width="30" src="../app/assets/image/infinite-spinner.svg" v-if="isRefresh">
          <span v-else>Refresh</span>
        </button>
      </div>
    </nav>
    <RouterView class="mt-3" />
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
