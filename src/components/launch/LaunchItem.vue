<template>
  <div class="launch-item">
    <span class="launch-item__date">
      {{ new Date(item.launch_date_utc).toLocaleDateString() }}
    </span>

    <h5 class="launch-item__title">{{ item.mission_name }}</h5>

    <p class="launch-item__details">
      {{ item.details || 'Description is not provided' }}
    </p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped lang="scss">
.launch-item {
  @apply text-left p-6 border rounded shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700;

  &__date {
    @apply text-sm dark:text-gray-400;
  }

  &__title {
    @apply mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white;
  }

  &__details {
    @apply text-base dark:text-gray-400;
  }
}
</style>
