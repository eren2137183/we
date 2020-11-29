import Vue from 'vue'
import App from './App.vue'
import VueGAPI from 'vue-gapi'

Vue.config.productionTip = false




 
// Use the plugin and pass along the configuration
Vue.use(VueGAPI, apiConfig)

new Vue({
  render: h => h(App),
}).$mount('#app')