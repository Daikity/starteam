<template>
<a :href="url" target="_blank" class="text-[12px] text-gray-500 hover:text-gray-400" :aria-label="url">
  {{ getDomainFromUrl(url) }}
</a>
</template>
<script lang="ts" setup>
const { url } = defineProps<{url: string}>()

const getDomainFromUrl = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    return `(${parsedUrl.hostname})`
  } catch (error) {
    return ''
  }
}
</script>
