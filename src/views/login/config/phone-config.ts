export const phonePattern = /^1\d{10}$/

export const rules = {
  num: [
    { required: true, message: '手机号不能为空~', trigger: 'blur' },
    { pattern: phonePattern, message: '请输入正确的手机号~', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '验证码不能为空~', trigger: 'blur' },
    { pattern: /^\d{4}$/, message: '验证码必须是4位的数字~', trigger: 'blur' }
  ]
}

export function isMobile(mobile: string): boolean {
  return phonePattern.test(mobile)
}
