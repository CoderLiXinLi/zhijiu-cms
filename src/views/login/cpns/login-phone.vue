<template>
  <el-form label-width="60px" :rules="rules" :model="phone" ref="formRef">
    <el-form-item label="手机号" prop="num" label-width="80px">
      <el-input v-model="phone.num" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="验证码" prop="code" label-width="80px">
      <div class="el-password">
        <el-input v-model="phone.code" placeholder="请输入验证码" maxlength="4" />
        <el-button
          type="primary"
          :loading="checkCodeBtn.loading"
          :disabled="checkCodeBtn.disabled"
          @click="getCheckCode"
          style="margin-left: 8px"
        >
          {{ checkCodeBtn.text }}
        </el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules, isMobile } from '../config/phone-config'
import { ElForm, ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      code: ''
    })

    let checkCodeBtn = reactive<any>({
      text: '获取验证码',
      loading: false,
      disabled: false,
      duration: 60,
      timer: null
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    // 根据用户名获取验证码
    const getCheckCode = () => {
      if (!isMobile(phone.num)) {
        ElMessage.error('请输入正确手机号')
      } else {
        // 倒计时期间按钮不能单击
        if (checkCodeBtn.duration !== 60) {
          checkCodeBtn.disabled = true
        }
        // 清除掉定时器
        checkCodeBtn.timer && clearInterval(checkCodeBtn.timer)
        // 开启定时器
        checkCodeBtn.timer = setInterval(() => {
          const tmp = checkCodeBtn.duration--
          checkCodeBtn.text = `${tmp}秒`
          if (tmp <= 0) {
            // 清除掉定时器
            clearInterval(checkCodeBtn.timer)
            checkCodeBtn.duration = 10
            checkCodeBtn.text = '重新获取'
            // 设置按钮可以单击
            checkCodeBtn.disabled = false
          }
          // console.info(checkCodeBtn.duration)
        }, 1000)
      }
    }

    const loginAction = () => {
      formRef.value?.validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log('phone真正的登录逻辑')
        }
      })
    }

    return {
      phone,
      rules,
      checkCodeBtn,
      getCheckCode,
      formRef,
      loginAction
    }
  }
})
</script>

<style scoped lang="less">
.el-password {
  display: flex;
}
</style>
