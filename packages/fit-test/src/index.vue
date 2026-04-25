<template>
  <div class="container">
    <!-- 头部标题 -->
    <div class="header">
      <h1 class="main-title">FitUI 组件示例</h1>
      <p class="subtitle">探索所有组件的示例和用法</p>
      
      <!-- 搜索框 -->
      <div class="search-box">
        <f-input 
          v-model="searchKeyword" 
          placeholder="搜索组件..." 
          clearable
          style="width: 400px;"
        />
      </div>

      <!-- 统计信息 -->
      <div class="stats">
        <span class="stat-item">
          <span class="stat-label">总组件数：</span>
          <span class="stat-value">{{ totalCount }}</span>
        </span>
        <span class="stat-item">
          <span class="stat-label">已完成：</span>
          <span class="stat-value">{{ completedCount }}</span>
        </span>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content">
      <!-- 基础组件 -->
      <div class="category" v-if="filteredComponents.basic.length > 0">
        <h2 class="category-title">基础组件</h2>
        <div class="components-grid">
          <div 
            class="component-card" 
            :class="{ disabled: !item.open }"
            v-for="item in filteredComponents.basic" 
            :key="item.name"
            @click="jumpComponent(item)"
          >
            <div class="card-content">
              <div class="component-icon">{{ item.icon }}</div>
              <div class="component-info">
                <h3 class="component-name">{{ item.displayName }}</h3>
                <p class="component-desc">{{ item.desc }}</p>
              </div>
            </div>
            <div class="card-footer" v-if="!item.open">
              <span class="badge">开发中</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 表单组件 -->
      <div class="category" v-if="filteredComponents.form.length > 0">
        <h2 class="category-title">表单组件</h2>
        <div class="components-grid">
          <div 
            class="component-card"
            :class="{ disabled: !item.open }"
            v-for="item in filteredComponents.form" 
            :key="item.name"
            @click="jumpComponent(item)"
          >
            <div class="card-content">
              <div class="component-icon">{{ item.icon }}</div>
              <div class="component-info">
                <h3 class="component-name">{{ item.displayName }}</h3>
                <p class="component-desc">{{ item.desc }}</p>
              </div>
            </div>
            <div class="card-footer" v-if="!item.open">
              <span class="badge">开发中</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 数据展示 -->
      <div class="category" v-if="filteredComponents.data.length > 0">
        <h2 class="category-title">数据展示</h2>
        <div class="components-grid">
          <div 
            class="component-card"
            :class="{ disabled: !item.open }"
            v-for="item in filteredComponents.data" 
            :key="item.name"
            @click="jumpComponent(item)"
          >
            <div class="card-content">
              <div class="component-icon">{{ item.icon }}</div>
              <div class="component-info">
                <h3 class="component-name">{{ item.displayName }}</h3>
                <p class="component-desc">{{ item.desc }}</p>
              </div>
            </div>
            <div class="card-footer" v-if="!item.open">
              <span class="badge">开发中</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 导航组件 -->
      <div class="category" v-if="filteredComponents.navigation.length > 0">
        <h2 class="category-title">导航组件</h2>
        <div class="components-grid">
          <div 
            class="component-card"
            :class="{ disabled: !item.open }"
            v-for="item in filteredComponents.navigation" 
            :key="item.name"
            @click="jumpComponent(item)"
          >
            <div class="card-content">
              <div class="component-icon">{{ item.icon }}</div>
              <div class="component-info">
                <h3 class="component-name">{{ item.displayName }}</h3>
                <p class="component-desc">{{ item.desc }}</p>
              </div>
            </div>
            <div class="card-footer" v-if="!item.open">
              <span class="badge">开发中</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 反馈组件 -->
      <div class="category" v-if="filteredComponents.feedback.length > 0">
        <h2 class="category-title">反馈组件</h2>
        <div class="components-grid">
          <div 
            class="component-card"
            :class="{ disabled: !item.open }"
            v-for="item in filteredComponents.feedback" 
            :key="item.name"
            @click="jumpComponent(item)"
          >
            <div class="card-content">
              <div class="component-icon">{{ item.icon }}</div>
              <div class="component-info">
                <h3 class="component-name">{{ item.displayName }}</h3>
                <p class="component-desc">{{ item.desc }}</p>
              </div>
            </div>
            <div class="card-footer" v-if="!item.open">
              <span class="badge">开发中</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface IExampleItem {
  name: string;
  displayName: string;
  path: string;
  open: boolean;
  category: 'basic' | 'form' | 'data' | 'navigation' | 'feedback';
  desc: string;
  icon: string;
}

// 创建路由对象
const router = useRouter();

// 搜索关键词
const searchKeyword = ref('');

/**
 * 根据提供的路径和打开状态，跳转到指定组件。
 */
const jumpComponent = ({ path, open }: Partial<IExampleItem>) => {
  // 如果未开放，则不进行任何操作
  if (!open) return;

  // 如果路径存在，则使用router进行页面跳转
  path && router.push(path)
}

// 所有组件配置
const componentsConfig: IExampleItem[] = [
  // 基础组件
  { name: 'Button', displayName: 'Button 按钮', path: '/button', open: true, category: 'basic', desc: '常用的操作按钮', icon: '🔘' },
  { name: 'Icon', displayName: 'Icon 图标', path: '/icon', open: true, category: 'basic', desc: '语义化的矢量图标', icon: '⭐' },
  { name: 'Tag', displayName: 'Tag 标签', path: '/tag', open: true, category: 'basic', desc: '用于标记和选择', icon: '🏷️' },
  { name: 'Badge', displayName: 'Badge 徽标', path: '/badge', open: true, category: 'basic', desc: '展示消息数量', icon: '🔴' },
  { name: 'Avatar', displayName: 'Avatar 头像', path: '/avatar', open: true, category: 'basic', desc: '用户头像展示', icon: '👤' },
  { name: 'Divider', displayName: 'Divider 分割线', path: '/divider', open: true, category: 'basic', desc: '区隔内容的分割线', icon: '➖' },
  { name: 'Progress', displayName: 'Progress 进度条', path: '/progress', open: true, category: 'basic', desc: '展示操作进度', icon: '📊' },
  { name: 'Space', displayName: 'Space 间距', path: '/space', open: true, category: 'basic', desc: '设置组件之间的间距', icon: '↔️' },
  { name: 'Scrollbar', displayName: 'Scrollbar 滚动条', path: '/scrollbar', open: true, category: 'basic', desc: '自定义滚动条样式', icon: '📜' },
  { name: 'Backtop', displayName: 'Backtop 回到顶部', path: '/backtop', open: true, category: 'basic', desc: '返回页面顶部', icon: '⬆️' },

  // 表单组件
  { name: 'Input', displayName: 'Input 输入框', path: '/input', open: true, category: 'form', desc: '基础表单输入', icon: '📝' },
  { name: 'InputNumber', displayName: 'InputNumber 数字输入框', path: '/input-number', open: true, category: 'form', desc: '仅允许输入数字', icon: '🔢' },
  { name: 'Textarea', displayName: 'Textarea 文本域', path: '/textarea', open: true, category: 'form', desc: '多行文本输入', icon: '📄' },
  { name: 'Select', displayName: 'Select 选择器', path: '/select', open: true, category: 'form', desc: '下拉选择器', icon: '📋' },
  { name: 'Checkbox', displayName: 'Checkbox 多选框', path: '/checkbox', open: true, category: 'form', desc: '多项选择', icon: '☑️' },
  { name: 'Radio', displayName: 'Radio 单选框', path: '/radio', open: true, category: 'form', desc: '单项选择', icon: '🔘' },
  { name: 'Switch', displayName: 'Switch 开关', path: '/switch', open: true, category: 'form', desc: '开关状态切换', icon: '🔛' },
  { name: 'Form', displayName: 'Form 表单', path: '/form', open: true, category: 'form', desc: '表单容器', icon: '📋' },
  { name: 'Slider', displayName: 'Slider 滑块', path: '/slider', open: true, category: 'form', desc: '滑动选择器', icon: '🎚️' },
  { name: 'TimePicker', displayName: 'TimePicker 时间选择器', path: '/time-picker', open: true, category: 'form', desc: '选择时间', icon: '🕐' },
  { name: 'DatePicker', displayName: 'DatePicker 日期选择器', path: '/date-picker', open: true, category: 'form', desc: '选择日期', icon: '📅' },

  // 数据展示
  { name: 'Table', displayName: 'Table 表格', path: '/table', open: true, category: 'data', desc: '展示行列数据', icon: '📊' },
  { name: 'Card', displayName: 'Card 卡片', path: '/card', open: true, category: 'data', desc: '通用卡片容器', icon: '🃏' },
  { name: 'Pagination', displayName: 'Pagination 分页', path: '/pagination', open: true, category: 'data', desc: '分页导航', icon: '📄' },
  { name: 'Empty', displayName: 'Empty 空状态', path: '/empty', open: true, category: 'data', desc: '空状态占位', icon: '📭' },
  { name: 'Skeleton', displayName: 'Skeleton 骨架屏', path: '/skeleton', open: true, category: 'data', desc: '内容加载占位', icon: '💀' },
  { name: 'CodeBlock', displayName: 'CodeBlock 代码块', path: '/code-block', open: true, category: 'data', desc: '代码展示', icon: '💻' },
  { name: 'Rate', displayName: 'Rate 评分', path: '/rate', open: true, category: 'data', desc: '评分组件', icon: '⭐' },
  { name: 'Descriptions', displayName: 'Descriptions 描述列表', path: '/descriptions', open: true, category: 'data', desc: '成组展示多个字段', icon: '📝' },
  { name: 'Timeline', displayName: 'Timeline 时间线', path: '/timeline', open: true, category: 'data', desc: '时间序列展示', icon: '📆' },
  { name: 'Steps', displayName: 'Steps 步骤条', path: '/steps', open: true, category: 'data', desc: '引导流程步骤', icon: '🔢' },
  { name: 'Image', displayName: 'Image 图片', path: '/image', open: true, category: 'data', desc: '图片展示与预览', icon: '🖼️' },

  // 导航组件
  { name: 'Menu', displayName: 'Menu 菜单', path: '/menu', open: true, category: 'navigation', desc: '导航菜单', icon: '📑' },
  { name: 'Tabs', displayName: 'Tabs 标签页', path: '/tabs', open: true, category: 'navigation', desc: '选项卡切换', icon: '📑' },
  { name: 'Breadcrumb', displayName: 'Breadcrumb 面包屑', path: '/breadcrumb', open: true, category: 'navigation', desc: '显示当前位置', icon: '🍞' },
  { name: 'Dropdown', displayName: 'Dropdown 下拉菜单', path: '/dropdown', open: true, category: 'navigation', desc: '弹出式菜单', icon: '⬇️' },

  // 反馈组件
  { name: 'Alert', displayName: 'Alert 警告', path: '/alert', open: true, category: 'feedback', desc: '警告提示', icon: '⚠️' },
  { name: 'Message', displayName: 'Message 消息提示', path: '/message', open: true, category: 'feedback', desc: '全局提示反馈', icon: '💬' },
  { name: 'Notification', displayName: 'Notification 通知', path: '/notification', open: true, category: 'feedback', desc: '通知提醒框', icon: '🔔' },
  { name: 'Loading', displayName: 'Loading 加载', path: '/loading', open: true, category: 'feedback', desc: '加载状态', icon: '⏳' },
  { name: 'Modal', displayName: 'Modal 对话框', path: '/modal', open: true, category: 'feedback', desc: '模态对话框', icon: '🔲' },
  { name: 'Drawer', displayName: 'Drawer 抽屉', path: '/drawer', open: true, category: 'feedback', desc: '抽屉面板', icon: '🗂️' },
  { name: 'Popover', displayName: 'Popover 气泡卡片', path: '/popover', open: true, category: 'feedback', desc: '弹出气泡', icon: '💭' },
  { name: 'Tooltip', displayName: 'Tooltip 文字提示', path: '/tooltip', open: true, category: 'feedback', desc: '简单的文字提示', icon: '💡' },
  { name: 'Result', displayName: 'Result 结果', path: '/result', open: true, category: 'feedback', desc: '操作结果反馈', icon: '✅' },
  { name: 'Watermark', displayName: 'Watermark 水印', path: '/watermark', open: true, category: 'feedback', desc: '页面水印效果', icon: '💧' },
  { name: 'MessageBox', displayName: 'MessageBox 消息弹窗', path: '/message-box', open: true, category: 'feedback', desc: '弹出消息框', icon: '💬' },
  { name: 'Popconfirm', displayName: 'Popconfirm 气泡确认框', path: '/popconfirm', open: true, category: 'feedback', desc: '点击元素后弹出确认框', icon: '🗨️' },
]

// 计算过滤后的组件
const filteredComponents = computed(() => {
  const keyword = searchKeyword.value.toLowerCase().trim();
  
  // 过滤组件
  const filtered = keyword 
    ? componentsConfig.filter(item => 
        item.name.toLowerCase().includes(keyword) || 
        item.displayName.toLowerCase().includes(keyword) ||
        item.desc.toLowerCase().includes(keyword)
      )
    : componentsConfig;

  // 按类别分组
  return {
    basic: filtered.filter(item => item.category === 'basic'),
    form: filtered.filter(item => item.category === 'form'),
    data: filtered.filter(item => item.category === 'data'),
    navigation: filtered.filter(item => item.category === 'navigation'),
    feedback: filtered.filter(item => item.category === 'feedback'),
  };
});

// 统计信息
const totalCount = computed(() => componentsConfig.length);
const completedCount = computed(() => componentsConfig.filter(item => item.open).length);

</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
  box-sizing: border-box;
}

.header {
  max-width: 1400px;
  margin: 0 auto 40px;
  text-align: center;
  color: white;

  .main-title {
    font-size: 48px;
    font-weight: 700;
    margin: 0 0 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  .subtitle {
    font-size: 18px;
    opacity: 0.9;
    margin: 0 0 30px;
  }

  .search-box {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .stats {
    display: flex;
    justify-content: center;
    gap: 40px;
    font-size: 16px;

    .stat-item {
      .stat-label {
        opacity: 0.9;
      }

      .stat-value {
        font-weight: 700;
        font-size: 20px;
        margin-left: 5px;
      }
    }
  }
}

.content {
  max-width: 1400px;
  margin: 0 auto;
}

.category {
  background: white;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  .category-title {
    font-size: 24px;
    font-weight: 700;
    color: #333;
    margin: 0 0 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid #f0f0f0;
  }
}

.components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.component-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover:not(.disabled) {
    transform: translateY(-8px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);

    &::before {
      opacity: 1;
    }
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
  }

  .card-content {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    position: relative;
    z-index: 1;
  }

  .component-icon {
    font-size: 36px;
    line-height: 1;
    flex-shrink: 0;
  }

  .component-info {
    flex: 1;
    min-width: 0;
  }

  .component-name {
    font-size: 20px;
    font-weight: 600;
    color: white;
    margin: 0 0 8px;
  }

  .component-desc {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    line-height: 1.5;
  }

  .card-footer {
    margin-top: 12px;
    position: relative;
    z-index: 1;

    .badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
  }
}
</style>