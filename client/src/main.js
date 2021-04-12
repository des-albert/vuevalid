import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

import { colors } from 'quasar'

const defaultTheme = {
  card: '#d5aca9',
  page: '#dfdebe',
  section: '#bdb6ac',
  drop: '#b3aac5',
  valid: '#c3c9b9',
  txtNormal: '#508CA4'
}

Object.keys(defaultTheme).forEach(element => {
  colors.setBrand(element, defaultTheme[element])
})

Vue.use(VueApollo)

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
