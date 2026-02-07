<template>
  <div>
    <custom-nav title="FForm"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：完整表单示例 -->
      <div class="section">
        <h3>完整表单示例</h3>
        <div class="row">
          <FForm v-model="formData" :rules="rules" ref="formRef" label-width="80px">
            <FFormItem label="用户名" prop="username">
              <FInput v-model="formData.username" placeholder="请输入用户名" />
            </FFormItem>
            <FFormItem label="密码" prop="password">
              <FInput v-model="formData.password" type="password" placeholder="请输入密码" />
            </FFormItem>
            <FFormItem label="确认密码" prop="confirmPassword">
              <FInput v-model="formData.confirmPassword" type="password" placeholder="请确认密码" />
            </FFormItem>
            <FFormItem label="性别" prop="gender">
              <FRadioGroup v-model="formData.gender">
                <FRadio label="男"></FRadio>
                <FRadio label="女"></FRadio>
              </FRadioGroup>
            </FFormItem>
            <FFormItem label="爱好" prop="hobbies">
              <FCheckboxGroup v-model="formData.hobbies">
                <FCheckbox label="足球"></FCheckbox>
                <FCheckbox label="篮球"></FCheckbox>
                <FCheckbox label="游泳"></FCheckbox>
              </FCheckboxGroup>
            </FFormItem>
            <FFormItem label="城市" prop="city">
              <FSelect v-model="formData.city" placeholder="请选择城市">
                <FOption value="北京">北京</FOption>
                <FOption value="上海">上海</FOption>
                <FOption value="广州">广州</FOption>
                <FOption value="深圳">深圳</FOption>
              </FSelect>
            </FFormItem>
            <FFormItem label="备注" prop="remark">
              <FTextarea v-model="formData.remark" placeholder="请输入备注" rows="3" />
            </FFormItem>
            <FFormItem label="同意协议" prop="agreement">
              <FCheckbox v-model="formData.agreement">我同意用户协议</FCheckbox>
            </FFormItem>
            <FFormItem>
              <FButton type="primary" @click="handleSubmit">提交</FButton>
              <FButton type="default" @click="handleReset" style="margin-left: 10px;">重置</FButton>
            </FFormItem>
          </FForm>
        </div>
      </div>

      <!-- 场景二：行内表单 -->
      <div class="section">
        <h3>行内表单</h3>
        <div class="row">
          <FForm v-model="inlineFormData" layout="inline" label-width="60px">
            <FFormItem label="用户名">
              <FInput v-model="inlineFormData.username" placeholder="请输入用户名" style="width: 150px;" />
            </FFormItem>
            <FFormItem label="密码">
              <FInput v-model="inlineFormData.password" type="password" placeholder="请输入密码" style="width: 150px;" />
            </FFormItem>
            <FFormItem>
              <FButton type="primary">登录</FButton>
            </FFormItem>
          </FForm>
        </div>
      </div>

      <!-- 场景三：表单项对齐方式 -->
      <div class="section">
        <h3>表单项对齐方式</h3>
        <div class="row">
          <FForm v-model="formData" label-position="left" label-width="80px">
            <FFormItem label="用户名">
              <FInput v-model="formData.username" placeholder="请输入用户名" />
            </FFormItem>
            <FFormItem label="密码">
              <FInput v-model="formData.password" type="password" placeholder="请输入密码" />
            </FFormItem>
          </FForm>
        </div>
      </div>

      <!-- 场景四：滚动到错误 (scrollToError) -->
      <div class="section">
        <h3>滚动到错误 (scrollToError)</h3>
        <div class="row">
          <FForm v-model="scrollFormData" :rules="scrollRules" ref="scrollFormRef" label-width="80px" scroll-to-error>
            <FFormItem label="用户名" prop="username">
              <FInput v-model="scrollFormData.username" placeholder="请输入用户名" />
            </FFormItem>
            <FFormItem label="邮箱" prop="email">
              <FInput v-model="scrollFormData.email" placeholder="请输入邮箱" />
            </FFormItem>
            <FFormItem label="手机号" prop="phone">
              <FInput v-model="scrollFormData.phone" placeholder="请输入手机号" />
            </FFormItem>
            <FFormItem label="地址" prop="address">
              <FInput v-model="scrollFormData.address" placeholder="请输入地址" />
            </FFormItem>
            <FFormItem label="备注" prop="remark">
              <FTextarea v-model="scrollFormData.remark" placeholder="请输入备注" rows="3" />
            </FFormItem>
            <FFormItem>
              <FButton type="primary" @click="handleScrollSubmit">提交（会滚动到第一个错误）</FButton>
              <FButton type="default" @click="handleScrollReset" style="margin-left: 10px;">重置</FButton>
            </FFormItem>
          </FForm>
        </div>
      </div>

      <!-- 场景五：星号位置 (requireAsteriskPosition) -->
      <div class="section">
        <h3>星号位置 (requireAsteriskPosition)</h3>
        <div class="row" style="flex-direction: column; gap: 20px;">
          <div>
            <h4 style="margin-bottom: 10px;">默认位置（左侧）</h4>
            <FForm v-model="asteriskFormData" :rules="asteriskRules" label-width="80px">
              <FFormItem label="用户名" prop="username">
                <FInput v-model="asteriskFormData.username" placeholder="请输入用户名" />
              </FFormItem>
              <FFormItem label="密码" prop="password">
                <FInput v-model="asteriskFormData.password" type="password" placeholder="请输入密码" />
              </FFormItem>
            </FForm>
          </div>
          <div>
            <h4 style="margin-bottom: 10px;">右侧位置</h4>
            <FForm v-model="asteriskFormData2" :rules="asteriskRules" label-width="80px" require-asterisk-position="right">
              <FFormItem label="用户名" prop="username">
                <FInput v-model="asteriskFormData2.username" placeholder="请输入用户名" />
              </FFormItem>
              <FFormItem label="密码" prop="password">
                <FInput v-model="asteriskFormData2.password" type="password" placeholder="请输入密码" />
              </FFormItem>
            </FForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FForm-Demo", inheritAttrs: false })

import { ref, reactive } from 'vue'
import type { FormInstance } from '@geniusmanyxh/fit-ui'

const formRef = ref<FormInstance>()

const formData = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  gender: '男',
  hobbies: [],
  city: '',
  remark: '',
  agreement: false
})

const inlineFormData = reactive({
  username: '',
  password: ''
})

const scrollFormRef = ref<FormInstance>()

const scrollFormData = reactive({
  username: '',
  email: '',
  phone: '',
  address: '',
  remark: ''
})

const scrollRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  address: [
    { required: true, message: '请输入地址', trigger: 'blur' }
  ],
  remark: [
    { required: true, message: '请输入备注', trigger: 'blur' }
  ]
})

const asteriskFormData = reactive({
  username: '',
  password: ''
})

const asteriskFormData2 = reactive({
  username: '',
  password: ''
})

const asteriskRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少 6 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (value !== formData.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  city: [
    { required: true, message: '请选择城市', trigger: 'change' }
  ],
  agreement: [
    { required: true, message: '请同意用户协议', trigger: 'change' }
  ]
})

const handleSubmit = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log('表单验证通过', formData)
      // 提交逻辑
    } else {
      console.log('表单验证失败')
    }
  })
}

const handleReset = () => {
  formRef.value?.resetFields()
}

const handleScrollSubmit = () => {
  scrollFormRef.value?.validate((valid) => {
    if (valid) {
      console.log('表单验证通过', scrollFormData)
    } else {
      console.log('表单验证失败，已滚动到第一个错误')
    }
  })
}

const handleScrollReset = () => {
  scrollFormRef.value?.resetFields()
}
</script>

<style scoped lang="scss">
.demoBox {
  .row {
    align-items: flex-start;
  }
  
  :deep(.f-form) {
    width: 100%;
    max-width: 600px;
  }
  
  :deep(.f-form-item) {
    margin-bottom: 15px;
  }
}
</style>
