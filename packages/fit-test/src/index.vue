<template>
  <div class="container">
    <div class="content">
      <div class="item" v-for="(item) in examplesArr" :key="item.name">
        <span class="title">{{ item.name }}组件示例</span>
        <f-button class="btn" @click="jumpComponent(item)">查看示例</f-button>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">

interface IExampleItem {
  name: string;
  path: string;
  open: boolean;
}

type IExampleArr = IExampleItem[];

// 创建路由对象
const router = useRouter();

/**
 * 根据提供的路径和打开状态，跳转到指定组件。
 * @param {Partial<IExampleItem>} param0 - 包含路径和打开状态的对象，为IExampleItem类型的部分字段。
 * @param {string} param0.path - 需要跳转到的路径。
 * @param {boolean} param0.open - 是否开放打开跳转逻辑的标志。
 * @returns 无返回值。
 */
const jumpComponent = ({ path, open }: Partial<IExampleItem>) => {
  // 如果未开放，则不进行任何操作
  if (!open) return;

  // 如果路径存在，则使用router进行页面跳转
  path && router.push(path)
}

// 创建所有路由对象数组
const examplesArr: IExampleArr = [
  { name: 'button', path: '/button', open: true },
  { name: 'icon', path: '/icon', open: true },
  { name: 'message', path: '/message', open: true },
  { name: 'layout', path: '/layout', open: false },
  { name: 'tabs', path: '/tabs', open: false },
  { name: 'popover', path: '/popover', open: false },
  { name: 'collapse', path: '/collapse', open: false },
  { name: 'toast', path: '/toast', open: false },
]

</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  padding: 20px;

  & .content {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    // background-color: aqua;

    & .item {
      width: 30%;
      height: 50px;
      line-height: 50px;
      margin-bottom: 20px;
      // background-color: aquamarine;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      & .title {
        font-size: 18px;
        font-weight: 600;
        margin-right: 10px;
        cursor: pointer;

        &:hover {
          color: #409eff;
        }
      }

      & .btn {
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
}
</style>