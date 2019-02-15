import ForgetPassword from '../pages/ForgetPassword.vue'
import sharedMixin from '../shared/mixin'

// hide title bar
try {
    const titleBar = weex.requireModule('titleBar')
    titleBar.showTitleBar(false)
} catch (e) {}

// use shared mixins
Vue.mixin(sharedMixin)

ForgetPassword.el = '#root'
new Vue(ForgetPassword)
