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
</script>

<style scoped lang="scss">
.demoBox {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  
  .section {
    width: 100%;
    
    h3 {
      margin-bottom: 20px;
      font-size: 18px;
      font-weight: 600;
    }
  }
  
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
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
