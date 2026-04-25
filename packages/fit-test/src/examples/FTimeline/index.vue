<template>
  <div>
    <custom-nav title="FTimeline"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础时间线 -->
      <div class="section">
        <h3>基础时间线</h3>
        <FTimeline>
          <FTimelineItem timestamp="2026-04-26" title="项目启动">
            <p class="timeline-content">项目正式启动，确定技术栈和开发计划</p>
          </FTimelineItem>
          <FTimelineItem timestamp="2026-04-28" title="需求评审">
            <p class="timeline-content">完成需求评审，确认功能列表</p>
          </FTimelineItem>
          <FTimelineItem timestamp="2026-05-05" title="开发阶段">
            <p class="timeline-content">进入开发阶段，完成核心功能开发</p>
          </FTimelineItem>
          <FTimelineItem timestamp="2026-05-20" title="项目上线">
            <p class="timeline-content">项目成功上线，开始正式运营</p>
          </FTimelineItem>
        </FTimeline>
      </div>

      <!-- 场景二：不同状态 -->
      <div class="section">
        <h3>不同状态</h3>
        <FTimeline>
          <FTimelineItem timestamp="2026-04-26" title="已完成" type="success">
            <p class="timeline-content">需求文档已完成审核</p>
          </FTimelineItem>
          <FTimelineItem timestamp="2026-04-28" title="进行中" type="primary">
            <p class="timeline-content">正在进行 UI 设计</p>
          </FTimelineItem>
          <FTimelineItem timestamp="2026-05-05" title="警告" type="warning">
            <p class="timeline-content">需要注意进度风险</p>
          </FTimelineItem>
          <FTimelineItem timestamp="2026-05-20" title="异常" type="danger">
            <p class="timeline-content">服务器出现异常，需要紧急处理</p>
          </FTimelineItem>
        </FTimeline>
      </div>

      <!-- 场景三：自定义颜色 -->
      <div class="section">
        <h3>自定义颜色</h3>
        <FTimeline>
          <FTimelineItem timestamp="2026-04-26" title="里程碑 1" color="#409eff">
            <p class="timeline-content">第一个里程碑完成</p>
          </FTimelineItem>
          <FTimelineItem timestamp="2026-05-10" title="里程碑 2" color="#67c23a">
            <p class="timeline-content">第二个里程碑完成</p>
          </FTimelineItem>
          <FTimelineItem timestamp="2026-06-01" title="里程碑 3" color="#e6a23c">
            <p class="timeline-content">第三个里程碑进行中</p>
          </FTimelineItem>
        </FTimeline>
      </div>

      <!-- 场景四：逆序排列 -->
      <div class="section">
        <h3>逆序排列</h3>
        <FTimeline reverse>
          <FTimelineItem timestamp="2026-04-26" title="最新事件">
            <p class="timeline-content">这是最新发生的事件</p>
          </FTimelineItem>
          <FTimelineItem timestamp="2026-04-20" title="中间事件">
            <p class="timeline-content">这是中间发生的事件</p>
          </FTimelineItem>
          <FTimelineItem timestamp="2026-04-15" title="起始事件">
            <p class="timeline-content">这是最开始的事件</p>
          </FTimelineItem>
        </FTimeline>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FTimeline, FTimelineItem } from '@geniusmanyxh/fit-ui'

defineOptions({ name: 'FTimeline-Demo', inheritAttrs: false })
</script>

<style scoped lang="scss">
.timeline-content {
  margin: 4px 0 0;
  font-size: 13px;
  color: #606266;
  line-height: 1.5;
}
</style>
