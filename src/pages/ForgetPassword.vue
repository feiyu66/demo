<template>
  <div class="ForgetPassword">
    <header class="header">
      <wxc-minibar title="忘记密码"
                       background-color="#02b3ed"
                       text-color="#FFFFFF"
                       :left-button="leftButton"
                       @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                       ></wxc-minibar>
        <!-- <text style="display: -webkit-flex;" class="text text-one" @click="toBack"><image class="returnImg" src='http://p87909xfg.bkt.clouddn.com/icon_back.png'></image></text>
        <text style="display: -webkit-flex;" class="text text-password">忘记密码</text>
        <text style="display: -webkit-flex;" class="text"></text>  -->
        
    </header>
    <section class="main">
        <div class="main-input">
            <div class="main-userName">
              <text class="userName-img" :style="{fontFamily:'iconfont', fontSize: '50px'}">{{getFontName}}</text>
              <input type="number" style="outline: none;" class="userName-phone" @input='onInputPhone'>
            </div>
            <div class="main-refresh" style="display: -webkit-flex;">
              <text class="text-img" :style="{fontFamily:'iconfont', fontSize: '54px'}">{{getRefresh}}</text>   
              <input type="number" style="outline: none;" class="refresh-phone" @input='onInputCode'>
              <!-- <text><button style="outline: none;" class="button">{{content}}</button></text>-->
              <wxc-button :btn-style="btnStyle" :disabled="disabled" :text='content' :text-style="textStyle" @wxcButtonClicked='wxcButtonClicked'></wxc-button> 
            </div>
            <div class="main-password">
              <text class="password-img" :style="{fontFamily:'iconfont', fontSize: '54px'}">{{getPassword}}</text>
              <input type="password"  style="outline: none;" @input="onInputPassword" class="password-phone" placeholder="请输入新密码" maxlength='20'>
            </div>
            <div class="main-password">
              <text class="password-img" :style="{fontFamily:'iconfont', fontSize: '54px'}">{{getPassword}}</text>
              <input type="password"  style="outline: none;" @input='onInputNewPassword' class="password-phone" placeholder="请再次输入新密码" maxlength='20'>
            </div>
            <div style="flex-direction: row;">
              <div class="footer-btn flex">
                <text class="newPwd" style="outline: none;" @click='newPassword'>重设密码</text>                
              </div>
            </div>
        </div>
    </section>
  </div>
</template>
<script>
import { WxcButton, WxcMinibar, WxcIcon } from "weex-ui";
import axios from "axios";
import md5 from "js-md5";
import he from 'he';
import api from "../shared/request";
// import '../../static/css/font-awesome.css'
const modal = weex.requireModule("modal");
export default {
  name: "ForgetPassword",
  data() {
    return {
      userName: '&#xe625;',
      refresh: '&#xe8aa;',
      password: '&#xe611;',
      num: 5, // 倒计时
      content: "点击获取",
      InputPhone: "", // 用户手机号
      InputCode: "", // 验证码
      InputPassword: "", // 密码
      InputNewPassword: "", // 再次输入密码
      width: "200px",
      height: "60px",
      backgroundColor: "#02b3ed",
      borderColor: "#ffffff",
      borderRadius: "5px",
      fontSize: "36px",
      color: "#FFFFFF",
      disabled: false,
      timer: null,
      leftButton: "http://p87909xfg.bkt.clouddn.com/icon_back.png"
    };
  },
  components: {
    WxcButton,
    WxcMinibar,
    WxcIcon
  },
  created() {
    let domModule = weex.requireModule('dom')
    domModule.addRule('fontFace', {
      'fontFamily': 'iconfont',
      'src':"url(\'http://at.alicdn.com/t/font_657110_cyfek5tluse2ke29.ttf\')"
    })
  },
  computed: {
    getFontName() {
      return he.decode(this.userName)
    },
    getRefresh() {
      return he.decode(this.refresh)
    },
    getPassword() {
      return he.decode(this.password)
    },
    btnStyle() {
      const {
        width,
        height,
        backgroundColor,
        borderColor,
        borderRadius
      } = this;
      const customStyle = {};

      if (width) {
        customStyle.width = width;
      }

      if (height) {
        customStyle.height = height;
        customStyle.lineHeight = height;
      }

      if (backgroundColor) {
        customStyle.backgroundColor = backgroundColor;
      }

      if (borderColor) {
        customStyle.borderColor = borderColor;
        customStyle.borderWidth = "1px";
        customStyle.borderStyle = "solid";
      }

      if (borderRadius) {
        customStyle.borderRadius = borderRadius;
      }
      return customStyle;
    },
    textStyle() {
      const { fontSize, color } = this;
      const customStyle = {};
      if (fontSize) {
        customStyle.fontSize = fontSize;
      }
      if (color) {
        customStyle.color = color;
      }
      return {
        fontSize,
        color
      };
    }
  },
  methods: {
    onInputPhone(event) {
      this.InputPhone = event.value;
    },
    onInputCode(event) {
      this.InputCode = event.value;
    },
    onInputPassword(event) {
      this.InputPassword = event.value;
    },
    onInputNewPassword(event) {
      this.InputNewPassword = event.value;
    },
    wxcButtonClicked(e) {
      // const { disabled } = e
      if (this.disabled == true) {
        return;
      }
      let reg = /^[1][3-9][0-9]{9}$/;
      if (!reg.test(this.InputPhone) || this.InputPhone.length < 1) {
        modal.toast({
          message: "请输入正确的手机号"
        });
      } else {
        let params = {
          clientType: 1,
          mobile: this.InputPhone,
          check: 0,
          type: 2
        };
        api.post("appmemberservice/sendverifycode.json?", params, data => {
          console.log(data);
          console.log(JSON.stringify(data))
          console.log(data.ERROR_TYPE);
          console.log(Object.keys(data))
          if (!data.ERROR_TYPE) {
            modal.toast({
              message: "发送成功"
            });
            this.disabled = true;
            this.timer = setInterval(() => {
              this.content = "重新发送" + "(" + this.num-- + ")";
              if (this.num < 0) {
                clearInterval(this.timer);
                this.disabled = false;
                this.num = 5;
                this.content = "点击获取";
              }
            }, 1000);
          } else if (data.ERROR_TYPE == "1") {
            modal.toast({
              message: "系统异常，发送失败"
            });
          } else if (data.ERROR_TYPE == "2") {
            modal.toast({
              message: "用户不存在"
            });
          } else if (data.ERROR_TYPE == "3") {
            modal.toast({
              message: "发送过于频繁，请明天再尝试。"
            });
          }
        });
      }
    },
    newPassword() {
      let reg = /^[1][3-9][0-9]{9}$/;
      if (!reg.test(this.InputPhone) || this.InputPhone.length < 1) {
        modal.toast({
          message: "请输入正确的手机号"
        });
      } else if (this.InputCode.length < 6) {
        modal.toast({
          message: "请输入6位验证码"
        });
      } else if (this.InputPassword.length === 0) {
        modal.toast({
          message: "请输入旧密码"
        });
      } else if (this.InputNewPassword.length < 6) {
        modal.toast({
          message: "密码不能小于六位"
        });
      } else if (this.InputPassword !== this.InputNewPassword) {
        modal.toast({
          message: "两次密码输入不一致"
        });
      } else {
        let params = {
          mobile: this.InputPhone,
          newPWD: md5.hex(this.InputNewPassword).toUpperCase(),
          type: 2,
          code: this.InputCode
        };
        api.post("appmemberservice/smsresetpassword.json?", params, data => {
          console.log(data);
          if (!data.ERROR_TYPE) {
            console.log("error null")
            modal.toast({
              message: "更新成功"
            });
          } else if (data.ERROR_TYPE == "1") {
            modal.toast({
              message: "系统异常，发送失败"
            });
          } else if (data.ERROR_TYPE == "2") {
            modal.toast({
              message: "用户不存在"
            });
          } else if (data.ERROR_TYPE == "3") {
            modal.toast({
              message: "验证码错误"
            });
          }
        });
      }
    },
    minibarLeftButtonClick () {
      modal.toast({
              message: "back"
      });
      let navigator = weex.requireModule("navigator");
      navigator.pop({
        animated: "true"
      });
    },
    toBack() {
      modal.toast({
              message: "back"
      });
      let navigator = weex.requireModule("navigator");
      navigator.pop({
        animated: "true"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ForgetPassword {
}
.header {
  height: 100px;
  background-color: #02b3ed;
  flex-direction: row;
}
.text {
  flex: 1;
  height: 100px;
  color: rgb(255, 255, 255);
  justify-content: center;
  align-items: center;
}
.text-one {
  justify-content: center;
  align-items: center;
}
.returnImg {
  width: 50px;
  height: 50px;
}
.text-password {
  flex: 5;
  font-size: 40px;
}
.main {
  flex: 1;
}
.main-input {
  margin: 0 40px;
}
.main-userName {
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgb(212, 212, 212);
  margin-top: 20px;
  padding-bottom: 20px;
}
.userName-img {
  width: 50px;
  height: 62px;
  margin-left: 20px;
}
.userName-phone {
  width: 350px;
  height: 50px;
  margin-left: 30px;
  font-size: 34px;
}
.main-refresh {
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: rgb(212, 212, 212);
  margin-top: 40px;
  padding-bottom: 20px;
}
.text-img {
  width: 60px;
  height: 55px;
  margin-left: 20px;
}
.refresh-phone {
  width: 360px;
  height: 50px;
  margin-left: 30px;
  font-size: 34px;
}
.main-password {
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: rgb(212, 212, 212);
  margin-top: 40px;
  padding-bottom: 20px;
}
.password-img {
  width: 50px;
  height: 62px;
  margin-left: 20px;
}
.password-phone {
  width: 600px;
  height: 50px;
  margin-left: 30px;
  font-size: 30px;
  color: rgb(170, 170, 170);
}
.footer-btn {
  height: 100px;
  width: 680px;
  border-radius: 5px;
  margin-top: 60px;
  background-color: #02b3ed;
  justify-content: center;
  align-items: center;
}
.newPwd {
  color: rgb(255, 255, 255);
  font-size: 32px;
}
.flex {
  display: flex;
}
</style>

