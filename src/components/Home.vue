<template>
    <div class="app">
        <header class="header" style="width: 100%;">
            <text class="nurse" @click="jump('motiondetails')">小护士</text>
        </header>
        <section class="section" style="overflow-y: scroll;">
            this is main
        </section>
    </div>
</template>
<script>
import { createLink } from '../shared/utils'
export default {
    name: 'Home',
    data () {
        return {

        }
    },
    methods: {
        jump (path) {
            const navigator = weex.requireModule('navigator')
            navigator.push({
                url: createLink(path),
                animated: "true"
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .app{
        display: -webkit-flex;
        flex-direction: column;
    }
    .header{
        height: 100px;
        background: pink;  
    }
    .nurse{
        height: 50px;
    }
    .section{
        flex:1;
        background: palegreen;
    }
</style>

