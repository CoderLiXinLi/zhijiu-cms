<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch>
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon class="login-icon"><avatar /></el-icon>
            账号登录Tab
          </span>
        </template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon class="login-icon"><iphone /></el-icon>
            手机登录Tab
          </span>
        </template>
        <LoginPhone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="control-account">
      <el-checkbox v-model="isKeppPassword">记住密码</el-checkbox>
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginPhone,
    LoginAccount
  },
  setup() {
    const isKeppPassword = ref(true)
    // const accountRef = ref() 这么写,会没有类型判断
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const handleLoginClick = () => {
      console.log('登录')
      console.log(accountRef.value)
      // accountRef.value.loginAction()
      accountRef.value?.loginAction(isKeppPassword.value)
      phoneRef.value?.loginAction()
    }
    return {
      isKeppPassword,
      accountRef,
      handleLoginClick,
      phoneRef
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 120px;
}
.title {
  text-align: center;
}
.login-icon {
  margin-right: 10px;
}
.control-account {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.login-btn {
  margin-top: 10px;
  width: 100%;
}
</style>
