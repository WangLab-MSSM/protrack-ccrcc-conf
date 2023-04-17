import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'

import AsyncComputed from 'vue-async-computed'
import VModal from 'vue-js-modal'

Vue.use(VModal)
Vue.use(AsyncComputed)
Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
