<template>
  <nav>
    <ul class="pagination">
      <li>
        <a href="#" class="pagination__btn__prev" v-on:click="onClick('prev')">
          Previous
        </a>
      </li>
      <li>
        <a href="#" class="pagination__btn__next" v-on:click="onClick('next')">
          Next
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['page-change'])

const onClick = (type) => emit('page-change', type)
</script>

<style scoped lang="scss">
@mixin pagination-btn {
  @apply flex items-center justify-center px-4 h-10 leading-tight border hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white;
}

.pagination {
  @apply inline-flex text-base h-10 mt-10;

  &__btn {
    &__prev {
      @include pagination-btn;
      @apply rounded-l-lg;
    }

    &__next {
      @include pagination-btn;
      @apply rounded-r-lg;
    }
  }
}
</style>
