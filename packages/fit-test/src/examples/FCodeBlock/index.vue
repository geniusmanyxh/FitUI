<template>
  <div>
    <custom-nav title="FCodeBlock"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：不同语言高亮 -->
      <div class="section">
        <h3>不同语言高亮</h3>
        <div class="row">
          <FCodeBlock language="javascript">
            {{ javascriptCode }}
          </FCodeBlock>
          <FCodeBlock language="html" style="margin-top: 20px;">
            {{ htmlCode }}
          </FCodeBlock>
          <FCodeBlock language="css" style="margin-top: 20px;">
            {{ cssCode }}
          </FCodeBlock>
        </div>
      </div>

      <!-- 场景二：行号显示 -->
      <div class="section">
        <h3>行号显示</h3>
        <div class="row">
          <FCodeBlock language="javascript" :show-line-numbers="true">
            {{ javascriptCode }}
          </FCodeBlock>
        </div>
      </div>

      <!-- 场景三：代码复制 -->
      <div class="section">
        <h3>代码复制</h3>
        <div class="row">
          <FCodeBlock language="javascript" :show-copy="true">
            {{ javascriptCode }}
          </FCodeBlock>
        </div>
      </div>

      <!-- 场景四：主题切换 -->
      <div class="section">
        <h3>主题切换</h3>
        <div class="row">
          <FCodeBlock language="javascript" theme="light">
            {{ javascriptCode }}
          </FCodeBlock>
          <FCodeBlock language="javascript" theme="dark" style="margin-top: 20px;">
            {{ javascriptCode }}
          </FCodeBlock>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FCodeBlock-Demo", inheritAttrs: false })

const javascriptCode = `function hello() {
  console.log('Hello world!');
}

hello();`

const htmlCode = `<div class="container">
  <h1>Hello</h1>
  <p>World</p>
</div>`

const cssCode = `.container {
  width: 100%;
  padding: 20px;
}

h1 {
  color: #1890ff;
}`
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
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    align-items: flex-start;
  }
  
  :deep(.f-code-block) {
    width: 100%;
    max-width: 600px;
  }
}
</style>
