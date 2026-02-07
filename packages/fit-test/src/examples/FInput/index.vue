<template>
  <div>
    <custom-nav title="FInput"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础输入 -->
      <div class="section">
        <h3>基础输入</h3>
        <div class="row">
          <FInput v-model="inputValue" placeholder="请输入内容" />
        </div>
      </div>

      <!-- 场景二：不同类型输入 -->
      <div class="section">
        <h3>不同类型输入</h3>
        <div class="row">
          <FInput v-model="inputValue" type="text" placeholder="文本输入" />
          <FInput v-model="passwordValue" type="password" placeholder="请输入密码" />
          <FInput v-model="numberValue" type="number" placeholder="数字输入" />
          <FInput v-model="emailValue" type="email" placeholder="邮箱输入" />
          <FInput v-model="searchValue" type="search" placeholder="搜索输入" />
        </div>
      </div>

      <!-- 场景三：不同尺寸 -->
      <div class="section">
        <h3>不同尺寸</h3>
        <div class="row">
          <FInput v-model="inputValue" size="small" placeholder="小型输入框" />
          <FInput v-model="inputValue" size="medium" placeholder="中型输入框" />
          <FInput v-model="inputValue" size="large" placeholder="大型输入框" />
        </div>
      </div>

      <!-- 场景四：可清空 -->
      <div class="section">
        <h3>可清空</h3>
        <p class="desc">鼠标悬停或聚焦时，当有内容时显示清空按钮</p>
        <div class="row">
          <FInput v-model="clearableValue" placeholder="请输入内容" clearable />
        </div>
      </div>

      <!-- 场景五：密码可见切换 -->
      <div class="section">
        <h3>密码可见切换</h3>
        <p class="desc">点击眼睛图标切换密码可见性</p>
        <div class="row">
          <FInput v-model="showPwdValue" type="password" placeholder="请输入密码" show-password />
        </div>
      </div>

      <!-- 场景六：前缀和后缀 -->
      <div class="section">
        <h3>前缀和后缀插槽</h3>
        <p class="desc">通过 prefix / suffix 插槽在输入框内部添加自定义内容</p>
        <div class="row">
          <FInput v-model="inputValue" placeholder="请输入搜索内容">
            <template #prefix>
              <span class="slot-icon">🔍</span>
            </template>
          </FInput>
          <FInput v-model="inputValue" placeholder="请输入金额">
            <template #prefix>
              <span class="slot-text">¥</span>
            </template>
            <template #suffix>
              <span class="slot-text">元</span>
            </template>
          </FInput>
          <FInput v-model="inputValue" placeholder="请输入链接">
            <template #suffix>
              <span class="slot-icon">🔗</span>
            </template>
          </FInput>
        </div>
      </div>

      <!-- 场景七：复合输入框 -->
      <div class="section">
        <h3>复合输入框（Prepend / Append）</h3>
        <p class="desc">通过 prepend / append 插槽在输入框前后添加元素</p>
        <div class="row column">
          <FInput v-model="urlValue" placeholder="请输入网址">
            <template #prepend>https://</template>
          </FInput>
          <FInput v-model="domainValue" placeholder="请输入域名">
            <template #append>.com</template>
          </FInput>
          <FInput v-model="fullUrlValue" placeholder="请输入">
            <template #prepend>https://</template>
            <template #append>.com</template>
          </FInput>
        </div>
      </div>

      <!-- 场景八：字数限制 -->
      <div class="section">
        <h3>字数限制</h3>
        <p class="desc">配合 maxlength 和 show-word-limit 显示字数统计</p>
        <div class="row">
          <FInput v-model="limitValue" placeholder="最多输入10个字符" :maxlength="10" show-word-limit />
        </div>
      </div>

      <!-- 场景九：Textarea 文本域 -->
      <div class="section">
        <h3>文本域（Textarea）</h3>
        <div class="row column">
          <FInput v-model="textareaValue" type="textarea" placeholder="请输入多行文本" />
          <FInput
            v-model="textareaLimitValue"
            type="textarea"
            placeholder="最多200字"
            :maxlength="200"
            show-word-limit
            :rows="4"
          />
        </div>
      </div>

      <!-- 场景十：Textarea 自适应高度 -->
      <div class="section">
        <h3>自适应高度 Textarea</h3>
        <p class="desc">通过 autosize 属性自适应内容高度，可设置最小和最大行数</p>
        <div class="row column">
          <FInput
            v-model="autosizeValue"
            type="textarea"
            placeholder="自适应高度（无限制）"
            autosize
          />
          <FInput
            v-model="autosizeRangeValue"
            type="textarea"
            placeholder="自适应高度（最少2行，最多6行）"
            :autosize="{ minRows: 2, maxRows: 6 }"
          />
        </div>
      </div>

      <!-- 场景十一：禁用状态 -->
      <div class="section">
        <h3>禁用状态</h3>
        <div class="row">
          <FInput v-model="inputValue" disabled placeholder="禁用的输入框" />
          <FInput v-model="textareaValue" type="textarea" disabled placeholder="禁用的文本域" />
        </div>
      </div>

      <!-- 场景十二：只读状态 -->
      <div class="section">
        <h3>只读状态</h3>
        <div class="row">
          <FInput model-value="只读内容" readonly />
          <FInput model-value="只读文本域内容" type="textarea" readonly />
        </div>
      </div>

      <!-- 场景十三：校验状态 -->
      <div class="section">
        <h3>校验状态</h3>
        <div class="row">
          <FInput v-model="inputValue" invalid placeholder="校验失败的输入框" />
          <FInput v-model="inputValue" type="textarea" invalid placeholder="校验失败的文本域" />
        </div>
      </div>

      <!-- 场景十四：无障碍支持 -->
      <div class="section">
        <h3>无障碍支持</h3>
        <div class="row column">
          <div class="form-field">
            <label :for="inputId">用户名</label>
            <FInput :id="inputId" v-model="inputValue" placeholder="请输入用户名" />
          </div>
          <div class="form-field">
            <label :for="emailFieldId">邮箱</label>
            <FInput
              :id="emailFieldId"
              v-model="emailFieldValue"
              placeholder="请输入邮箱"
              required
              :describedby="emailHelpId"
            />
            <span :id="emailHelpId" class="help-text">请输入有效的邮箱地址</span>
          </div>
        </div>
      </div>

      <!-- 场景十五：组合使用 -->
      <div class="section">
        <h3>组合使用</h3>
        <p class="desc">clearable + prefix + suffix + 字数限制</p>
        <div class="row column">
          <FInput
            v-model="comboValue"
            placeholder="请输入搜索内容"
            clearable
            :maxlength="30"
            show-word-limit
          >
            <template #prefix>
              <span class="slot-icon">🔍</span>
            </template>
          </FInput>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'FInput-Demo', inheritAttrs: false })

import { ref } from 'vue'

const inputValue = ref('')
const passwordValue = ref('')
const numberValue = ref('')
const emailValue = ref('')
const searchValue = ref('')
const clearableValue = ref('可以清除这段文字')
const showPwdValue = ref('')
const urlValue = ref('')
const domainValue = ref('')
const fullUrlValue = ref('')
const limitValue = ref('')
const textareaValue = ref('')
const textareaLimitValue = ref('')
const autosizeValue = ref('')
const autosizeRangeValue = ref('')
const emailFieldValue = ref('')
const comboValue = ref('')
const inputId = 'f-input-username'
const emailFieldId = 'f-input-email'
const emailHelpId = 'f-input-email-help'
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
      margin-bottom: 8px;
      font-size: 18px;
      font-weight: 600;
    }

    .desc {
      margin-bottom: 16px;
      font-size: 13px;
      color: var(--f-text-secondary, #999);
    }
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding: 16px 20px;
    align-items: center;

    &.column {
      flex-direction: column;
      align-items: stretch;
    }
  }

  :deep(.f-input),
  :deep(.f-textarea) {
    width: 320px;
  }

  .row.column {
    :deep(.f-input),
    :deep(.f-textarea) {
      width: 100%;
      max-width: 500px;
    }
  }

  .slot-icon {
    font-size: 14px;
    line-height: 1;
  }

  .slot-text {
    font-size: 13px;
    color: var(--f-text-secondary, #999);
    line-height: 1;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-width: 500px;

    label {
      font-size: 14px;
      font-weight: 500;
    }
  }

  .help-text {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    color: var(--f-text-secondary, #666);
  }
}
</style>
