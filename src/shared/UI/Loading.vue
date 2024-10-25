<template>
  <div class="flex gap-2">
    <img width="30" src="../../app/assets/image/infinite-spinner.svg">{{ text }}
  </div>
</template>
<script lang="ts" setup>
const { text } = defineProps<{ text?: string }>()
</script>
