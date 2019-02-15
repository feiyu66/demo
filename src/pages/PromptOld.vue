<template>
    <div class="prompt" style="display: -webkit-flex;">
        <image class="promptOld" style="width: 100%; height: 100%;" src='/static/images/BG-IMG-old.png'></image>
        <button class="prompt-btn" style="outline: none;" @click='jump("promptNew")'>好的</button>
    </div>
</template>
<script>
import { createLink } from '../shared/utils'
export default {
    name: 'PromptOld',
    data () {
        return {

        }
    },
    methods: {
        jump (path) {
            if(!path) return;
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
    .prompt{
        justify-content: center;
        align-items: center;
    }
    .promptOld{
        position: absolute;
        left: 0;
        top: 0;
    }
    .prompt-btn{
        position: absolute;
        bottom: 140px;
        padding: 10px 100px;
        border-width: 4px;
        border-color: #1BA7D8;
        background-color: #ffffff;
        border-radius: 10px;
        color: #1BA7D8;
        font-size: 30px;
    }
</style>

