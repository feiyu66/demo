<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
// import '../static/font/iconfont.css'
export default {
  name: 'App',
  data () {
    return {
      
    }
  }
}
</script>
<style>
  *{
    margin: 0;
    padding: 0;
    font-size: .14rem;
    font-family: '思源黑体'; 
  }
  html,body,.wrapper{
    width: 100%;
    height: 100%;
  }
  html{
    font-size: 625%;
  }
  a{
    text-decoration: none;
    color: #000;
  }
  .wrapper{
    display: flex;
    flex-direction: column;
  }
</style>
