import App from '../pages/App.vue'
import sharedMixin from '../shared/mixin'

// use shared mixins
Vue.mixin(sharedMixin)

App.el = '#root'
new Vue(App)
