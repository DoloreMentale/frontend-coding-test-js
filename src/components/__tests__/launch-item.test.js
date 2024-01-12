import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import LaunchItem from '../launch/LaunchItem.vue'

test('mount component', () => {
  expect(LaunchItem).toBeTruthy()

  const testProps = {
    mission_name: 'Falcon 9 Test Flight',
  }

  const wrapper = mount(LaunchItem, {
    props: { item: { mission_name: testProps.mission_name } },
  })

  expect(wrapper.text()).toContain(testProps.mission_name)
})
