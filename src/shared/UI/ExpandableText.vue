<template>
  <div>
    <div
      ref="textContent"
      :class="{ expanded: isExpanded }"
      class="text-content"
      v-html="text"
    />
    <div class="cursor-pointer pt-2 lowercase text-gray-500 hover:text-gray-300" v-if="showButton" @click="toggleExpand">
      {{ isExpanded ? 'Show less' : 'Show more' }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  text?: string;
}>();

const isExpanded = ref(false);
const showButton = ref(false);

const textContent = ref<HTMLElement | null>(null);

function toggleExpand() {
  isExpanded.value = !isExpanded.value;
}

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  if (textContent.value) {
    resizeObserver = new ResizeObserver(() => {
      if (!isExpanded.value) {
        showButton.value = textContent.value!.scrollHeight > textContent.value!.clientHeight;
      }
    });
    resizeObserver.observe(textContent.value);
    showButton.value = textContent.value.scrollHeight > textContent.value.clientHeight;
  }
});

onUnmounted(() => {
  if (resizeObserver && textContent.value) {
    resizeObserver.unobserve(textContent.value);
  }
});
</script>

<style scoped>
.text-content {
  max-height: 3em;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.text-content.expanded {
  max-height: none;
}
</style>
