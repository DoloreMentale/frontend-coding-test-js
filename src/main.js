import { createApp, h, provide } from 'vue'
import './styles/main.css'
import 'vue-toastification/dist/index.css'

import { DefaultApolloClient } from '@vue/apollo-composable'
import Toast from 'vue-toastification'
import { apolloClient } from './plugins/apollo-client'

import App from './App.vue'
import initializeRouter from './router'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

initializeRouter(app)

app.use(Toast)

app.mount('#app')
