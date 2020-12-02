<template>
  <div v-if="loginState" class="login-box">
    <el-card v-if="!isRegister">
      <header>
        <div class="left">
          <div @click="toggle" v-if="!isLogin">
            <span class="el-icon-arrow-left" />
            <span>返回登陆</span>
          </div>
        </div>
        <div @click="setLoginState(false)" class="close"><span class="el-icon-close" /></div>
      </header>
      <div class="cover">
        <img :src="logo" alt="" />
      </div>
      <!-- form -->
      <el-form
        :show-message="false"
        class="logo-form"
        :rules="rules"
        ref="loginForm"
        :model="loginForm"
      >
        <el-form-item prop="phone">
          <el-input
            @focus="validResult = ''"
            prefix-icon="el-icon-goods"
            v-model="loginForm.phone"
          ></el-input>
        </el-form-item>
        <el-form-item class="pwd" prop="password">
          <el-input
            @focus="validResult = ''"
            prefix-icon="el-icon-info"
            type="password"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <div v-if="!isLogin && !validResult" class="be-careful">
          密码8到20位，至少包含字母/数字/字符2种组合
        </div>
        <div v-if="validResult" class="validResult">{{ validResult }}</div>
      </el-form>
      <!-- 这个注册是获取验证码 -->
      <button v-if="!isLogin" @click="getCaptcha" type="button">注册</button>
      <!-- 登录 -->
      <button v-else @click="toLogin" type="button">登录</button>
      <!-- 切换到注册页 -->
      <div v-if="isLogin" class="register">
        <span @click="toggle">注册</span>
      </div>
    </el-card>
    <!-- 验证码 -->
    <el-card v-if="isRegister" class="captcha">
      <header>
        <div class="title">请输入验证码</div>
      </header>
      <p>
        你的手机号：+86 150****8295 <br />为了安全，我们会给你发送短信验证码
      </p>
      <div class="code">
        <div class="text">
          <input class="inputCode" @input="inputCode(0, $event)" type="text" />
        </div>
        <div class="text">
          <input class="inputCode" @input="inputCode(1, $event)" type="text" />
        </div>
        <div class="text">
          <input class="inputCode" @input="inputCode(2, $event)" type="text" />
        </div>
        <div class="text">
          <input class="inputCode" @input="inputCode(3, $event)" type="text" />
        </div>
      </div>
      <div v-if="num === 0" @click="sendCode" class="resetCode">重新发送</div>
      <div v-else class="resetCode">{{ num }}</div>
      <!-- 最终注册 -->
      <button @click="toRegister" type="button">
        下一步
      </button>
      <div @click="backLogin" class="backLogin">返回登录</div>
    </el-card>
    <div class="shadow" />
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      logo: logo,
      loginForm: {
        phone: '',
        password: ''
      },
      // 验证码
      captcha: '',
      isLogin: true,
      isRegister: false,
      inputCodes: null,
      //
      arr: [],
      // 验证码验证
      isVerify: false,
      // 计时
      num: 0,
      rules: {
        phone: [
          {
            required: true,
            min: 11,
            max: 11,
            message: '请输入11位数字的手机号',
            trigger: 'false'
          },
          {
            pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
            message: '无效手机号',
            trigger: 'false'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'false' },
          { min: 8, max: 20, message: '请输入8到20位密码', trigger: 'false' }
        ]
      },
      // 表单验证结果
      validResult: ''
    }
  },
  computed: mapState({
    loginState: state => state.user.loginState
  }),
  watch: {
    // 验证码验证
    captcha (value) {
      if (value.length === 4) {
        const that = this
        this.verifyCode({ phone: this.loginForm.phone, captcha: this.captcha })
          .catch(() => {
            that.isVerify = false
            // const { data } = error.response
            that.$message.error('验证码错误')
          })
          .then(() => {
            that.isVerify = true
          })
      } else {
        this.isVerify = false
      }
    },
    // 是否显示登录界面
    loginState () {
      this.loginForm = {
        phone: '',
        password: ''
      }
      this.initData()
    }
  },
  methods: {
    // 初始化
    initData () {
      this.captcha = ''
      this.isRegister = false
      this.inputCodes = null
      this.isVerify = false
      this.num = 0
      this.validResult = ''
      this.isLogin = true
    },
    // 登录
    toLogin () {
      const result = this.verifyForm()
      if (result) {
        this.login(this.loginForm)
          .then((res) => {
            if (res.code === 200) {
              this.setLoginState(false)
              // 获取账号信息
              this.logoutStatus()
            } else {
              this.validResult = '账号或密码错误'
            }
          })
          .catch(() => {
            this.validResult = '账号或密码错误'
          })
      }
    },
    // 注册
    toRegister () {
      if (this.isVerify) {
        this.loginForm.captcha = this.captcha
        this.register(this.loginForm)
          .then(() => {
            this.initData()
            this.$message({
              message: '注册成功',
              type: 'success'
            })
          })
          .catch((error) => {
            this.initData()
            this.$message.error('注册失败')
            console.log(error)
          })
      } else {
        this.$message.error('验证码错误')
      }
    },
    // 表单验证
    verifyForm () {
      let result = false
      this.$refs.loginForm.validate((valid, obj) => {
        console.log(obj)
        if (valid) {
          result = true
          return true
        } else {
          console.log('error submit!!')
          const { phone = null, password = null } = obj
          let index
          if (phone) {
            index = 'phone'
          } else if (password) {
            index = 'password'
          }
          this.validResult = obj[index][0].message
          result = false
          return false
        }
      })
      return result
    },
    // 登录注册切换
    toggle () {
      this.validResult = ''
      this.isLogin = !this.isLogin
    },
    // 获取验证码
    getCaptcha () {
      if (!this.verifyForm()) {
        return
      }
      this.isRegister = true
      this.sendCode()
    },
    // 发送验证码
    sendCode () {
      if (this.loginForm.phone) {
        this.num = 60
        const time = setInterval(() => {
          this.num--
          if (this.num === 0) {
            clearInterval(time)
          }
        }, 1000)
        this.sentCode(this.loginForm.phone).catch(() => {
          this.$message.error('发送验证码失败，请稍后再试')
          this.num = 0
          clearInterval(time)
        })
      } else {
        this.setLoginState(false)
      }
    },
    // 输入验证码
    inputCode (num, e) {
      if (!this.inputCodes) {
        const inputCodes = document.querySelectorAll('.inputCode')
        this.inputCodes = inputCodes
      }

      if (e.target.value.length === 1) {
        this.arr[num] = e.target.value
        num++
        if (num <= 3) {
          this.inputCodes[num].focus()
        }
      } else if (e.target.value.length > 1) {
        const value = e.target.value[0]
        e.target.value = value
        num++
        if (num <= 3) {
          this.inputCodes[num].focus()
        } else if (num > 3) {
          return
        }
      } else if (e.target.value.length === 0) {
        this.arr.splice(num, 1, undefined)
        num--
        if (num >= 0) {
          this.inputCodes[num].focus()
        }
      }
      this.captcha = this.arr.join('')
    },
    // 返回登录
    backLogin () {
      this.initData()
    },
    ...mapActions({
      sentCode: 'sentCode',
      verifyCode: 'verifyCode',
      register: 'register',
      login: 'login',
      logoutStatus: 'logoutStatus'
    }),
    ...mapMutations({
      setLoginState: 'SET_LOGIN_STATE'
    })
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-card {
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px 30px;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 -30px;
    .left {
      div {
        cursor: pointer;
        font-size: 12px;
        margin-left: 15px;
      }
    }
    .close {
      cursor: pointer;
      font-size: 20px;
      margin-right: 10px;
    }
    .title {
      margin-left: 15px;
      font-size: 12px;
    }
  }
  .cover {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
    img {
      width: 50px;
    }
  }
  .logo-form {
    margin-bottom: 20px;
    .pwd {
      margin-bottom: 10px;
    }
    .be-careful {
      font-size: 12px;
      color: #b1aeae;
    }
    .el-input {
      width: 260px;
    }
    .validResult {
      text-align: right;
      font-size: 12px;
      color: #ea4848;
    }
  }
  button {
    width: 100%;
    border: 0;
    outline: none;
    border-radius: 5px;
    background-color: #ea4848;
    color: #fff;
    padding: 8px 0;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .register {
    text-align: center;
    text-decoration: underline;
    font-size: 14px;
    span {
      cursor: pointer;
    }
  }
}
.captcha {
  p {
    font-size: 12px;
    line-height: 2;
    margin-top: 5px;
  }
  .code {
    display: flex;
    margin-bottom: 10px;
    .text {
      border-bottom: 1px solid red;
      width: 50px;
      margin-right: 10px;
      input {
        width: 100%;
        border: 0;
        outline: none;
        text-align: center;
      }
    }
  }
  .resetCode {
    text-align: right;
    font-size: 12px;
    margin-bottom: 15px;
    cursor: pointer;
  }
  .backLogin {
    margin-top: 10px;
    font-size: 14px;
    cursor: pointer;
  }
}
.shadow {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1;
}
</style>
