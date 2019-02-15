<template>
  <div class="loading">
    <div class="logo">
      <image class="title-logo" src="http://p87909xfg.bkt.clouddn.com/login_page_logo.png" alt=""></image>
    </div>
    <div class="main">
      <div class="phone">
        <div class="phone-label flex">
          <image class="phone-logo" src='http://p87909xfg.bkt.clouddn.com/icon_default_call.png'></image>
          <input @input="onInputMobile" class="phone-input no-outline" autocomplete="off" type="text" v-model="mobile"/>
        </div>
      </div>
      <div class="password">
        <div class="password-label flex">
          <image class="password-logo" src='http://p87909xfg.bkt.clouddn.com/icon_default_password.png'></image>
          <input @input="onInputPassword" class="password-input no-outline" type="password" v-model="password"/>
        </div>
      </div>
      <div style="flex-direction: row;">
        <div class="login" @click='clicked("promptOld")'>
          <text class="btn-label" @click='clicked("promptOld")'>登录</text>
        </div>
      </div>
      <div class="text-content" style="display: flex;">
        <text class="text" @click='ForgetPassword("forgetpassword")'>忘记密码？</text>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import md5 from 'js-md5'
  import { createLink } from '../shared/utils'
  import { readData, saveData } from '../shared/default_preference'
  import api from '../shared/request'
  const modal = weex.requireModule('modal')

  export default {
    name: 'Login',
    data () {
      return {
        mobile: '',
        password: ''
      }
    },
    created () {
      console.log("created")
      readData("passwd", passwd => {
        if (passwd != null) {
          this.mobile = passwd.mobile
          this.password = passwd.password
        }
      }
      ,err => {
        console.log(err)
      })
    },
    methods: {
      onInputMobile (event) {
        this.mobile = event.value
      },
      onInputPassword (event) {
        this.password = event.value
      },
      clicked (path) {
        let reg = /^[1][3-9][0-9]{9}$/;
        if ( !reg.test(this.mobile) || this.mobile.length < 1) {
          modal.toast({
              message: '请输入正确的手机号!' 
          })
        } else if ( this.password.length < 1 ) {
          modal.toast({
            message: '请输入密码!'
          })
        } else {
          const navigator = weex.requireModule('navigator')
          let params = {
              ip: '',
              loginType: 2,
              loginKey: this.mobile,
              password: md5.hex(this.password).toUpperCase()
          }
          /*请求数据*/
          api.get('appmemberservice/memberlogin.json?',params, data => {
            console.log(data)
            if (!data.ERROR_TYPE) {
              console.log("save")
              let passwd = {
                mobile: this.mobile,
                password: this.password
              }
              saveData("passwd", passwd)
              const navigator = weex.requireModule('navigator')
              navigator.push({
                url: createLink(path),
                animated: "true"
              })
              // this.$router.push(path)
              // localStorage.setItem('loginKey', this.mobile)
            }
          })
        }
      },
      ForgetPassword (path) {
        if(!path) return;
        const navigator = weex.requireModule('navigator')
        console.log(createLink('forgetpassword'))
        navigator.push({
          url: createLink(path),
          animated: "true"
        })
      }
    }
  }
</script>
<style scoped>
  
  .loading{
    
  }
  .logo{
    padding-top: 200px;
    align-items: center;
  }
  .title-logo{
    width: 190px;
    height: 190px;
  }
  .main{
    padding:0 35px;
    margin-top: 100px;
  }
  .phone{
    padding-bottom: 20px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #cccccc;
    margin-bottom: 50px;
  }
  .phone-label{
    flex-direction: row;
  }
  .phone-logo{
    margin-left: 20px;
    width: 45px;
    height: 55px;
  }
  .phone-input{
    width: 500px;   /*不指定宽度真机不会激活输入框*/
    height: 50px;   /*weex input高度比内容小的话光标不会显示*/
    margin-left: 40px;
    font-size: 33px;
    color: rgb(102, 102, 102);
  }
  .password{
    padding-bottom: 20px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #cccccc;
  }
  .password-label{
    flex-direction: row;
  }
  .password-logo{
    margin-left: 20px;
    width: 45px;
    height: 55px;
  }
  .password-input{
    width: 500px;
    height: 50px;
    margin-left: 40px;
    font-size: 43px;
    color: rgb(51, 51, 51);
  }
  .login{
    height: 100px;
    width: 680px;
    margin-top: 80px;
    border-radius: 15px;
    background-image: linear-gradient(to bottom, #6cdbff, #02b3ed); 
    justify-content: center;
    align-items: center;
  }
  .btn-label{
    font-size: 39px;
    color: rgb(255, 255, 255);
  }
  .text-content{
    height: 80px;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .text{
    color: rgb(102, 102, 102);
    font-size: 28px;
  }
  .no-outline {
    outline: none;
  }
  .flex {
    display: flex;
  }
</style>
