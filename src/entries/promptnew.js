import PromptNew from '../pages/PromptNew.vue'
import sharedMixin from '../shared/mixin'

// use shared mixins
Vue.mixin(sharedMixin)

PromptNew.el = '#root'
new Vue(PromptNew)
