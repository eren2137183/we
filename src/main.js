import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false




 
// Use the plugin and pass along the configuration


new Vue({
  render: h => h(App),
}).$mount('#app')