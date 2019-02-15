/* global Vue */

/* weex initialized here, please do not move this line */
// const router = require('./router')
// const App = require('@/index.vue')
import App from '@/index.vue'
import router from './router'
// import store from './store/index.js'
// import { sync } from 'vuex-router-sync'
// import * as filters from './filters'
// import mixins from './mixins'

// sync(store, router)

// register global utility filters.
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })

// Vue.mixin(mixins)
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router}, App))
router.push('/')
