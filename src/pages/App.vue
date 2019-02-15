<template>
  <wxc-tab-bar :tab-titles="tabTitles"
               :tab-styles="tabStyles"
               title-type="icon"
               @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
    <!--The first page content-->
    <div class="item-container" :style="contentStyle"><Home/></div> 

    <!--The second page content-->
    <div class="item-container" :style="contentStyle"><Record/></div> 

    <!-- The third page content-->
    <div class="item-container" :style="contentStyle"><Consultation/></div> 

    <!-- The fourth page content-->
    <div class="item-container" :style="contentStyle"><Mine/></div> 
  </wxc-tab-bar>
</template>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        font-size: 14px;
        font-family: '思源黑体'; 
    }
    a{
        text-decoration: none;
        color: #000;
    } 
    .item-container {
        width: 750px;
        background-color: #f2f3f4;
    }
</style>
<script>
import { WxcTabBar, Utils } from 'weex-ui';
import Config from '../shared/config'
import Home from '../components/Home.vue'
import Consultation from '../components/Consultation.vue'
import Record from '../components/Consultation.vue'
import Mine from '../components/Mine.vue'
export default {
    components: { WxcTabBar, Home, Consultation, Record, Mine },
    data: () => ({
        tabTitles: Config.tabTitles,
        tabStyles: Config.tabStyles
    }),
    created () {
        const tabPageHeight = Utils.env.getPageHeight();
        const { tabStyles } = this;
        this.contentStyle = { height: (tabPageHeight - tabStyles.height) + 'px' };
    },
    methods: {
        wxcTabBarCurrentTabSelected (e) {
            const index = e.page;
        }
    }
};
</script>