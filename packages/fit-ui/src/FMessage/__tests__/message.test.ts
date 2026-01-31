import FMessage from "..";
import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";

describe("FMessage", () => {
  test("mount with default message", () => {
    const wrapper = mount(FMessage, {
      props: {
        msg: "测试消息",
      },
    });
    expect(wrapper.text()).toContain("测试消息");
    
    // FMessage 根元素是 transition，需要查找内部的 div
    const messageItem = wrapper.find(".f-message-item");
    expect(messageItem.exists()).toBe(true);
  });

  test("renders different message types", () => {
    const types = ["default", "success", "error", "warn", "info"];
    types.forEach((type) => {
      const wrapper = mount(FMessage, {
        props: {
          msg: `${type} message`,
          type: type as any,
        },
      });
      
      // 查找内部的消息元素并检查类名
      const messageItem = wrapper.find(".f-message-item");
      expect(messageItem.classes()).toContain(`msg_${type}`);
    });
  });

  test("shows close button when showClose is true", () => {
    const wrapper = mount(FMessage, {
      props: {
        msg: "可关闭的消息",
        showClose: true,
      },
    });

    const closeBtn = wrapper.find(".f-message-item-close");
    expect(closeBtn.exists()).toBe(true);
  });

  test("emits close event when close button clicked", async () => {
    const wrapper = mount(FMessage, {
      props: {
        msg: "测试消息",
        showClose: true,
      },
    });

    const closeBtn = wrapper.find(".f-message-item-close");
    await closeBtn.trigger("click");
    
    expect(wrapper.emitted("close")).toBeTruthy();
  });

  test("auto closes after duration", async () => {
    vi.useFakeTimers();
    
    const wrapper = mount(FMessage, {
      props: {
        msg: "自动关闭消息",
        duration: 1000,
      },
    });

    expect(wrapper.find(".f-message-item").exists()).toBe(true);

    // 快进时间
    vi.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();

    // 消息应该被关闭（isShow 变为 false）
    expect(wrapper.emitted("close")).toBeTruthy();

    vi.useRealTimers();
  });

  test("does not auto close when duration is 'notime'", async () => {
    vi.useFakeTimers();
    
    const wrapper = mount(FMessage, {
      props: {
        msg: "不自动关闭",
        duration: "notime",
      },
    });

    expect(wrapper.find(".f-message-item").exists()).toBe(true);

    vi.advanceTimersByTime(5000);
    await wrapper.vm.$nextTick();

    // 消息不应该关闭
    expect(wrapper.find(".f-message-item").exists()).toBe(true);

    vi.useRealTimers();
  });

  test("applies custom zIndex", () => {
    const wrapper = mount(FMessage, {
      props: {
        msg: "自定义层级",
        zIndex: 9999,
      },
    });

    const messageItem = wrapper.find(".f-message-item");
    expect(messageItem.attributes("style")).toContain("z-index: 9999");
  });

  test("renders with slot content", () => {
    const wrapper = mount(FMessage, {
      slots: {
        default: "<strong>自定义消息内容</strong>",
      },
    });
    expect(wrapper.html()).toContain("<strong>自定义消息内容</strong>");
  });
});
