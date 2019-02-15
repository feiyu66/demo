import Login from '../pages/Login.vue'
import sharedMixin from '../shared/mixin'

// hide title bar
try {
    const titleBar = weex.requireModule('titleBar')
    titleBar.showTitleBar(false)
} catch (e) {}

// use shared mixins
Vue.mixin(sharedMixin)

Login.el = '#root'
new Vue(Login)
