<template>
<button 
  @click="onToggle" 
  class="toggle-btn"
  :class="`text-${size}`"
  v-if="showBtn">
  {{ !isOpen ? onText : offText }}
</button>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
  interface Props { onText: string, offText: string, showBtn?: boolean, size?: 'sm' | 'md' | 'lg' }
  const props = withDefaults(defineProps<Props>(), { showBtn: true, size: 'sm' })
  const { onText, offText, showBtn } = props;
  const emit = defineEmits(['onToggleState'])
  const isOpen = ref<boolean>(false)

  const onToggle = (): void => {
    isOpen.value = !isOpen.value
    emit('onToggleState', isOpen.value)
  }
</script>

<style lang="scss">
  .toggle-btn {
    @apply text-gray-500 bg-transparent font-bold lowercase hover:text-gray-300;
    @apply outline-none focus:outline-none ease-linear transition-all duration-150;
  }
</style>
