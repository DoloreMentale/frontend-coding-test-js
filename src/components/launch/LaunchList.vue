<template>
  <div v-if="loading">Loading...</div>

  <div v-else-if="error">Error: {{ error.message }}</div>

  <template v-if="result && result.launches">
    <div class="launch-list">
      <LaunchItem
        v-for="launch in result.launches"
        v-bind:key="`launch-${launch.id}`"
        v-bind:item="launch"
      />
    </div>

    <Pagination v-on:page-change="(type) => onPageChange(type)" />
  </template>
</template>

<script>
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

import { useToast } from 'vue-toastification'
import LaunchItem from './LaunchItem.vue'
import Pagination from '../pagination/Pagination.vue'

export default {
  components: { Pagination, LaunchItem },
  setup() {
    const toast = useToast()

    const offset = ref(0)
    const limit = ref(8)

    const { result, loading, error, onResult, onError, fetchMore } = useQuery(
      gql`
        query getLaunches($offset: Int, $limit: Int) {
          launches(offset: $offset, limit: $limit) {
            id
            details
            launch_date_utc
            mission_name
          }
        }
      `,
      () => ({
        offset: offset.value,
        limit: limit.value,
      }),
    )

    // Well, "if (loading)" is expected to block onResult fired twice, VueApollo should fix it.
    onResult(() => {
      if (!loading.value) {
        toast.success('Fetched successfully')
      }
    })
    onError(() => {
      if (!loading.value) toast.error('Error during fetching data')
    })

    // eslint-disable-next-line consistent-return
    const onPageChange = (type) => {
      if (type === 'prev' && offset.value === 0)
        return toast.info('Already fetched')

      offset.value +=
        // eslint-disable-next-line no-nested-ternary
        type === 'next' ? limit.value : type === 'prev' ? -limit.value : null

      fetchMore({
        variables: {
          offset: offset.value,
        },
      })
    }

    return {
      result,
      loading,
      error,

      onPageChange,
    }
  },
}
</script>

<style scoped lang="scss">
.launch-list {
  @apply grid grid-cols-4 gap-4;
}
</style>
