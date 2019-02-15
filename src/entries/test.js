import Test from '../pages/Test.vue'
import sharedMixin from '../shared/mixin'

// hide title bar
try {
    const titleBar = weex.requireModule('titleBar')
    titleBar.showTitleBar(false)
} catch (e) {}

// use shared mixins
Vue.mixin(sharedMixin)

Test.el = '#root'
new Vue(Test)
