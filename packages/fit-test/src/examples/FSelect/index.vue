<template>
  <div class="f-select-demo">
    <custom-nav title="FSelect"></custom-nav>
    <div class="demo-container">

      <!-- 场景一：基础单选 -->
      <div class="demo-section">
        <h3>基础单选</h3>
        <p class="demo-desc">最基本的单选功能，支持 v-model 双向绑定和自定义 placeholder。</p>
        <div class="demo-content">
          <div class="demo-row">
            <FSelect v-model="singleValue" placeholder="请选择城市">
              <FOption v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value" />
            </FSelect>
          </div>
          <div class="demo-result">
            <span class="result-label">选中值：</span>
            <span class="result-value">{{ singleValue || '无' }}</span>
          </div>
        </div>
      </div>

      <!-- 场景二：基础多选 -->
      <div class="demo-section">
        <h3>基础多选</h3>
        <p class="demo-desc">多选功能，已选项以标签形式展示，支持点击 × 移除。</p>
        <div class="demo-content">
          <div class="demo-row">
            <FSelect v-model="multipleValue" multiple placeholder="请选择技能">
              <FOption v-for="item in skillOptions" :key="item.value" :label="item.label" :value="item.value" />
            </FSelect>
          </div>
          <div class="demo-result">
            <span class="result-label">选中值：</span>
            <span class="result-value">{{ multipleValue.length ? JSON.stringify(multipleValue) : '无' }}</span>
          </div>
        </div>
      </div>

      <!-- 场景三：禁用状态 -->
      <div class="demo-section">
        <h3>禁用状态</h3>
        <p class="demo-desc">支持组件级、选项级和分组级禁用。</p>
        <div class="demo-content">
          <div class="demo-row demo-row--vertical">
            <div class="demo-sub-item">
              <p class="sub-title">组件级禁用</p>
              <FSelect v-model="singleValue" disabled placeholder="组件已禁用">
                <FOption v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
            <div class="demo-sub-item">
              <p class="sub-title">选项级禁用</p>
              <FSelect v-model="singleValue" placeholder="请选择">
                <FOption v-for="item in optionsWithDisabled" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
              </FSelect>
            </div>
          </div>
        </div>
      </div>

      <!-- 场景四：可清除选择 -->
      <div class="demo-section">
        <h3>可清除选择</h3>
        <p class="demo-desc">设置 clearable 属性后，选中时会出现清空图标。</p>
        <div class="demo-content">
          <div class="demo-row demo-row--vertical">
            <div class="demo-sub-item">
              <p class="sub-title">单选可清除</p>
              <FSelect v-model="clearableSingleValue" clearable placeholder="请选择">
                <FOption v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
            <div class="demo-sub-item">
              <p class="sub-title">多选可清除</p>
              <FSelect v-model="clearableMultipleValue" multiple clearable placeholder="请选择">
                <FOption v-for="item in skillOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
          </div>
        </div>
      </div>

      <!-- 场景五：可搜索过滤 -->
      <div class="demo-section">
        <h3>可搜索过滤</h3>
        <p class="demo-desc">支持本地搜索、自定义过滤方法和保留关键字。</p>
        <div class="demo-content">
          <div class="demo-row demo-row--vertical">
            <div class="demo-sub-item">
              <p class="sub-title">本地搜索</p>
              <FSelect v-model="singleValue" filterable placeholder="请输入搜索">
                <FOption v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
            <div class="demo-sub-item">
              <p class="sub-title">自定义过滤方法</p>
              <FSelect v-model="singleValue" filterable :filter-method="customFilterMethod" placeholder="自定义过滤">
                <FOption v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
            <div class="demo-sub-item">
              <p class="sub-title">保留关键字 (reserve-keyword)</p>
              <FSelect v-model="singleValue" filterable reserve-keyword placeholder="选中后保留搜索词">
                <FOption v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
          </div>
        </div>
      </div>

      <!-- 场景六：远程搜索 -->
      <div class="demo-section">
        <h3>远程搜索</h3>
        <p class="demo-desc">支持远程搜索，配合 loading 状态展示加载效果。</p>
        <div class="demo-content">
          <div class="demo-row">
            <FSelect
              v-model="remoteValue"
              filterable
              remote
              :loading="remoteLoading"
              :remote-method="handleRemoteSearch"
              placeholder="请输入关键字搜索"
            >
              <FOption v-for="item in remoteOptions" :key="item.value" :label="item.label" :value="item.value" />
              <template #loading>
                <div class="custom-loading">
                  <span class="loading-text">搜索中...</span>
                </div>
              </template>
            </FSelect>
          </div>
          <div class="demo-result">
            <span class="result-label">选中值：</span>
            <span class="result-value">{{ remoteValue || '无' }}</span>
          </div>
        </div>
      </div>

      <!-- 场景七：创建新选项 -->
      <div class="demo-section">
        <h3>创建新选项</h3>
        <p class="demo-desc">开启 allow-create 后，可输入新值并创建新选项。</p>
        <div class="demo-content">
          <div class="demo-row demo-row--vertical">
            <div class="demo-sub-item">
              <p class="sub-title">单选创建</p>
              <FSelect v-model="createSingleValue" filterable allow-create placeholder="输入新值或选择">
                <FOption v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
            <div class="demo-sub-item">
              <p class="sub-title">多选创建</p>
              <FSelect v-model="createMultipleValue" multiple filterable allow-create placeholder="输入新值或选择">
                <FOption v-for="item in skillOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
          </div>
          <div class="demo-result">
            <span class="result-label">单选值：</span>
            <span class="result-value">{{ createSingleValue || '无' }}</span>
          </div>
          <div class="demo-result">
            <span class="result-label">多选值：</span>
            <span class="result-value">{{ createMultipleValue.length ? JSON.stringify(createMultipleValue) : '无' }}</span>
          </div>
        </div>
      </div>

      <!-- 场景八：选项分组 -->
      <div class="demo-section">
        <h3>选项分组</h3>
        <p class="demo-desc">支持使用 FOptionGroup 组件或数据结构进行分组。</p>
        <div class="demo-content">
          <div class="demo-row demo-row--vertical">
            <div class="demo-sub-item">
              <p class="sub-title">使用 FOptionGroup</p>
              <FSelect v-model="groupValue" placeholder="请选择城市">
                <FOptionGroup label="热门城市">
                  <FOption value="sh" label="上海" />
                  <FOption value="bj" label="北京" />
                  <FOption value="gz" label="广州" />
                </FOptionGroup>
                <FOptionGroup label="其他城市" :disabled="true">
                  <FOption value="sz" label="深圳" />
                  <FOption value="hz" label="杭州" />
                </FOptionGroup>
              </FSelect>
            </div>
            <div class="demo-sub-item">
              <p class="sub-title">使用数据结构分组</p>
              <FSelect v-model="groupValue" :options="groupedOptions" placeholder="请选择">
              </FSelect>
            </div>
          </div>
        </div>
      </div>

      <!-- 场景九：折叠标签 -->
      <div class="demo-section">
        <h3>折叠标签</h3>
        <p class="demo-desc">多选模式下可折叠标签，支持控制显示数量和悬停提示。</p>
        <div class="demo-content">
          <div class="demo-row demo-row--vertical">
            <div class="demo-sub-item">
              <p class="sub-title">折叠标签 (collapse-tags)</p>
              <FSelect v-model="collapseTagsValue" multiple collapse-tags placeholder="请选择">
                <FOption v-for="item in skillOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
            <div class="demo-sub-item">
              <p class="sub-title">控制显示数量 (max-collapse-tags=2)</p>
              <FSelect v-model="collapseTagsValue" multiple collapse-tags :max-collapse-tags="2" placeholder="请选择">
                <FOption v-for="item in skillOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
            <div class="demo-sub-item">
              <p class="sub-title">悬停提示 (collapse-tags-tooltip)</p>
              <FSelect v-model="collapseTagsValue" multiple collapse-tags collapse-tags-tooltip :max-collapse-tags="1" placeholder="请选择">
                <FOption v-for="item in skillOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
          </div>
          <div class="demo-result">
            <span class="result-label">选中值：</span>
            <span class="result-value">{{ collapseTagsValue.length ? JSON.stringify(collapseTagsValue) : '无' }}</span>
          </div>
        </div>
      </div>

      <!-- 场景十：尺寸变化 -->
      <div class="demo-section">
        <h3>尺寸变化</h3>
        <p class="demo-desc">支持 small (28px)、medium (36px)、large (44px) 三种尺寸。</p>
        <div class="demo-content">
          <div class="demo-row">
            <FSelect v-model="singleValue" size="small" placeholder="小型选择器">
              <FOption v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value" />
            </FSelect>
            <FSelect v-model="singleValue" size="medium" placeholder="中型选择器">
              <FOption v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value" />
            </FSelect>
            <FSelect v-model="singleValue" size="large" placeholder="大型选择器">
              <FOption v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value" />
            </FSelect>
          </div>
        </div>
      </div>

      <!-- 场景十一：标签颜色类型 -->
      <div class="demo-section">
        <h3>标签颜色类型</h3>
        <p class="demo-desc">多选模式下支持 tag-type 属性设置标签颜色。</p>
        <div class="demo-content">
          <div class="demo-row demo-row--vertical">
            <div class="demo-sub-item">
              <p class="sub-title">默认颜色</p>
              <FSelect v-model="multipleValue" multiple placeholder="请选择">
                <FOption v-for="item in skillOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
            <div class="demo-sub-item">
              <p class="sub-title">Success 颜色</p>
              <FSelect v-model="multipleValue" multiple tag-type="success" placeholder="请选择">
                <FOption v-for="item in skillOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
            <div class="demo-sub-item">
              <p class="sub-title">Warning 颜色</p>
              <FSelect v-model="multipleValue" multiple tag-type="warning" placeholder="请选择">
                <FOption v-for="item in skillOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
            <div class="demo-sub-item">
              <p class="sub-title">Danger 颜色</p>
              <FSelect v-model="multipleValue" multiple tag-type="danger" placeholder="请选择">
                <FOption v-for="item in skillOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
          </div>
        </div>
      </div>

      <!-- 场景十二：自定义模板 -->
      <div class="demo-section">
        <h3>自定义模板</h3>
        <p class="demo-desc">通过插槽自定义前缀、后缀、选项、空状态和下拉箭头。</p>
        <div class="demo-content">
          <div class="demo-row demo-row--vertical">
            <div class="demo-sub-item">
              <p class="sub-title">前缀/后缀插槽</p>
              <FSelect v-model="singleValue" placeholder="带图标">
                <template #prefix>
                  <span class="custom-icon">📍</span>
                </template>
                <template #suffix>
                  <span class="custom-icon">⭐</span>
                </template>
                <FOption v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
            <div class="demo-sub-item">
              <p class="sub-title">自定义选项模板</p>
              <FSelect v-model="singleValue" placeholder="请选择">
                <FOption v-for="item in cityOptions" :key="item.value" :value="item.value" :label="item.label">
                  <span class="custom-option">{{ item.label }} ({{ item.value }})</span>
                </FOption>
                <template #option="{ option }">
                  <span class="custom-option">{{ option.label }} - {{ option.value }}</span>
                </template>
              </FSelect>
            </div>
            <div class="demo-sub-item">
              <p class="sub-title">自定义空状态</p>
              <FSelect v-model="singleValue" placeholder="请选择">
                <template #empty>
                  <span class="custom-empty">暂无数据，请稍后重试</span>
                </template>
              </FSelect>
            </div>
            <div class="demo-sub-item">
              <p class="sub-title">自定义下拉箭头</p>
              <FSelect v-model="singleValue" placeholder="请选择">
                <template #arrow>
                  <span class="custom-arrow">▼</span>
                </template>
                <FOption v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
          </div>
        </div>
      </div>

      <!-- 场景十三：下拉框定位 -->
      <div class="demo-section">
        <h3>下拉框定位</h3>
        <p class="demo-desc">支持 6 种定位方式，控制下拉框相对于触发器的显示位置。</p>
        <div class="demo-content">
          <div class="demo-row demo-row--vertical">
            <div class="demo-sub-item">
              <p class="sub-title">bottom (默认)</p>
              <FSelect v-model="singleValue" placement="bottom" placeholder="bottom">
                <FOption v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
            <div class="demo-sub-item">
              <p class="sub-title">top</p>
              <FSelect v-model="singleValue" placement="top" placeholder="top">
                <FOption v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
            <div class="demo-sub-item">
              <p class="sub-title">bottom-start</p>
              <FSelect v-model="singleValue" placement="bottom-start" placeholder="bottom-start">
                <FOption v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
            <div class="demo-sub-item">
              <p class="sub-title">top-end</p>
              <FSelect v-model="singleValue" placement="top-end" placeholder="top-end">
                <FOption v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value" />
              </FSelect>
            </div>
          </div>
        </div>
      </div>

      <!-- 场景十四：对象值支持 -->
      <div class="demo-section">
        <h3>对象值支持</h3>
        <p class="demo-desc">支持使用对象作为选项值，通过 valueKey 指定唯一标识字段。</p>
        <div class="demo-content">
          <div class="demo-row">
            <FSelect v-model="objectValue" :value-key="'id'" placeholder="请选择用户">
              <FOption v-for="item in userOptions" :key="item.id" :label="item.name" :value="item" />
            </FSelect>
          </div>
          <div class="demo-result">
            <span class="result-label">选中值：</span>
            <span class="result-value">{{ objectValue ? JSON.stringify(objectValue) : '无' }}</span>
          </div>
        </div>
      </div>

      <!-- 场景十五：事件与方法调用 -->
      <div class="demo-section">
        <h3>事件与方法调用</h3>
        <p class="demo-desc">展示所有事件监听和通过 ref 调用组件方法。</p>
        <div class="demo-content">
          <div class="demo-row">
            <FSelect
              ref="selectRef"
              v-model="eventValue"
              filterable
              multiple
              clearable
              placeholder="操作此组件"
              @change="handleEvent('change', $event)"
              @visible-change="handleEvent('visible-change', $event)"
              @remove-tag="handleEvent('remove-tag', $event)"
              @clear="handleEvent('clear', $event)"
              @focus="handleEvent('focus', $event)"
              @blur="handleEvent('blur', $event)"
              @create="handleEvent('create', $event)"
            >
              <FOption v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value" />
            </FSelect>
            <div class="demo-methods">
              <button class="demo-btn" @click="selectRef?.focus()">Focus</button>
              <button class="demo-btn" @click="selectRef?.blur()">Blur</button>
              <button class="demo-btn" @click="selectRef?.open()">Open</button>
              <button class="demo-btn" @click="selectRef?.close()">Close</button>
            </div>
          </div>
          <div class="demo-log">
            <p class="log-title">事件日志：</p>
            <ul class="log-list">
              <li v-for="(log, index) in eventLogs" :key="index" class="log-item">
                <span class="log-index">{{ index + 1 }}</span>
                <span class="log-name">{{ log.name }}</span>
                <span class="log-value">{{ log.value }}</span>
              </li>
              <li v-if="eventLogs.length === 0" class="log-empty">暂无事件触发</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FSelect-Demo", inheritAttrs: false })

import { ref } from 'vue'

const selectRef = ref<any>(null)

const singleValue = ref('')
const multipleValue = ref<string[]>([])
const clearableSingleValue = ref('')
const clearableMultipleValue = ref<string[]>([])
const remoteValue = ref('')
const createSingleValue = ref('')
const createMultipleValue = ref<string[]>([])
const groupValue = ref('')
const collapseTagsValue = ref<string[]>([])
const objectValue = ref<Record<string, unknown> | null>(null)
const eventValue = ref<string[]>([])

const remoteLoading = ref(false)
const remoteOptions = ref<{ value: string; label: string }[]>([])

const eventLogs = ref<{ name: string; value: string }[]>([])

const cityOptions = [
  { value: 'sh', label: '上海' },
  { value: 'bj', label: '北京' },
  { value: 'gz', label: '广州' },
  { value: 'sz', label: '深圳' },
  { value: 'hz', label: '杭州' },
  { value: 'nj', label: '南京' },
  { value: 'cd', label: '成都' },
]

const skillOptions = [
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'node', label: 'Node.js' },
]

const optionsWithDisabled = [
  { value: 'option1', label: '选项1', disabled: false },
  { value: 'option2', label: '选项2', disabled: true },
  { value: 'option3', label: '选项3', disabled: false },
  { value: 'option4', label: '选项4', disabled: true },
  { value: 'option5', label: '选项5', disabled: false },
]

const groupedOptions = [
  {
    value: 'group-1',
    label: '热门城市',
    children: [
      { value: 'sh', label: '上海' },
      { value: 'bj', label: '北京' },
      { value: 'gz', label: '广州' },
    ],
  },
  {
    value: 'group-2',
    label: '其他城市',
    children: [
      { value: 'sz', label: '深圳' },
      { value: 'hz', label: '杭州' },
      { value: 'nj', label: '南京' },
    ],
  },
]

const userOptions = [
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 },
  { id: 3, name: '王五', age: 28 },
]

function customFilterMethod(query: string, option: { label: string }) {
  return option.label.toLowerCase().includes(query.toLowerCase())
}

function handleRemoteSearch(query: string) {
  if (!query) {
    remoteOptions.value = []
    return
  }
  remoteLoading.value = true
  setTimeout(() => {
    remoteOptions.value = cityOptions.filter(item =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.value.toLowerCase().includes(query.toLowerCase())
    )
    remoteLoading.value = false
  }, 500)
}

function handleEvent(name: string, value: unknown) {
  const logValue = typeof value === 'object' ? JSON.stringify(value) : String(value)
  eventLogs.value.unshift({ name, value: logValue })
  if (eventLogs.value.length > 20) {
    eventLogs.value.pop()
  }
}
</script>

<style scoped lang="scss">
.f-select-demo {
  padding: 20px;
}

.demo-container {
  max-width: 900px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 32px;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

  h3 {
    margin: 0 0 8px;
    font-size: 18px;
    font-weight: 600;
    color: #1d2129;
  }
}

.demo-desc {
  margin: 0 0 16px;
  font-size: 14px;
  color: #4e5969;
  line-height: 1.5;
}

.demo-content {
  padding: 16px;
  background: #f7f8fa;
  border-radius: 6px;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;

  &--vertical {
    flex-direction: column;
    align-items: flex-start;
  }
}

.demo-sub-item {
  width: 100%;

  .sub-title {
    margin: 0 0 8px;
    font-size: 13px;
    color: #86909c;
  }
}

.demo-result {
  margin-top: 12px;
  font-size: 14px;

  .result-label {
    color: #86909c;
  }

  .result-value {
    color: #1d2129;
    font-family: monospace;
  }
}

.demo-methods {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.demo-btn {
  padding: 6px 16px;
  font-size: 13px;
  color: #fff;
  background: #165dff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0e42d2;
  }

  &:active {
    background: #0a31a8;
  }
}

.demo-log {
  margin-top: 16px;
  padding: 12px;
  background: #fff;
  border: 1px solid #e5e6eb;
  border-radius: 6px;

  .log-title {
    margin: 0 0 8px;
    font-size: 13px;
    font-weight: 600;
    color: #1d2129;
  }
}

.log-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
}

.log-item {
  display: flex;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #f2f3f5;
  font-size: 13px;

  &:last-child {
    border-bottom: none;
  }
}

.log-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  font-size: 12px;
  color: #86909c;
  background: #f2f3f5;
  border-radius: 50%;
}

.log-name {
  margin-right: 8px;
  padding: 2px 8px;
  font-size: 12px;
  color: #165dff;
  background: #e8f3ff;
  border-radius: 3px;
}

.log-value {
  color: #4e5969;
  font-family: monospace;
  word-break: break-all;
}

.log-empty {
  padding: 16px;
  text-align: center;
  font-size: 13px;
  color: #c0c4cc;
}

.custom-icon {
  font-size: 16px;
}

.custom-option {
  display: flex;
  align-items: center;
  gap: 4px;
}

.custom-empty {
  color: #86909c;
  font-style: italic;
}

.custom-arrow {
  font-size: 12px;
}

.custom-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;

  .loading-text {
    color: #86909c;
    font-size: 14px;
  }
}

:deep(.f-select) {
  min-width: 240px;
}
</style>
