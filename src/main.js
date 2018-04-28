import Vue from 'vue'
import './styles/main.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from '@/components/app'
import store from './store'
import router from './router'

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
