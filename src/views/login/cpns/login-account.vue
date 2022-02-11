<template>
  <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
    <el-form-item label="账号" prop="name">
      <el-input v-model="account.name" placeholder="请输入账号" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" placeholder="请输入密码" show-password />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    /* 作为配置文件引入
    const rules = {
      name: [
        { required: true, message: '用户名不能为空~', trigger: 'blur' },
        { pattern: /^[a-z0-9]{5,10}$/, message: '用户名必须是5-10个字母或者数字~', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '密码不能为空~', trigger: 'blur' },
        { pattern: /^[a-z0-9]{3}$/, message: '密码必须是3位以上的字母或者数字~', trigger: 'blur' }
      ]
    }
*/
    // const loginAction = () => {
    //   console.log('account真正的登录逻辑')
    // }

    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isKeppPassword: boolean) => {
      formRef.value?.validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log('account真正的登录逻辑')
          //1.判断是否需要记住密码
          if (isKeppPassword) {
            // 本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          //2.开始进行登录验证
        }
      })
    }

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
