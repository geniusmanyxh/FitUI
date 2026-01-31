import FTag from "..";
import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

describe("FTag", () => {
  test("mount with default props", () => {
    const wrapper = mount(FTag, {
      props: {
        label: "测试标签",
      },
    });
    expect(wrapper.text()).toContain("测试标签");
    expect(wrapper.classes()).toContain("tag");
  });

  test("renders different types", () => {
    const types = ["default", "primary", "success", "warning", "danger", "info"];
    types.forEach((type) => {
      const wrapper = mount(FTag, {
        props: {
          label: `${type} tag`,
          type: type as any,
        },
      });
      expect(wrapper.classes()).toContain(type);
    });
  });

  test("renders different sizes", () => {
    const sizes = ["mini", "small", "medium", "large"];
    sizes.forEach((size) => {
      const wrapper = mount(FTag, {
        props: {
          label: "Tag",
          size: size as any,
        },
      });
      expect(wrapper.classes()).toContain(size);
    });
  });

  test("closable tag emits close event", async () => {
    const wrapper = mount(FTag, {
      props: {
        label: "可关闭标签",
        closable: true,
      },
    });

    const closeBtn = wrapper.find(".close-btn");
    expect(closeBtn.exists()).toBe(true);

    await closeBtn.trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
  });

  test("disabled tag cannot be closed", async () => {
    const wrapper = mount(FTag, {
      props: {
        label: "禁用标签",
        closable: true,
        disabled: true,
      },
    });

    expect(wrapper.classes()).toContain("disabled");
    
    const closeBtn = wrapper.find(".close-btn");
    await closeBtn.trigger("click");
    
    // 禁用状态下不应该触发 close 事件
    expect(wrapper.emitted("close")).toBeFalsy();
  });

  test("round prop adds round class", () => {
    const wrapper = mount(FTag, {
      props: {
        label: "圆角标签",
        round: true,
      },
    });
    expect(wrapper.classes()).toContain("round");
  });

  test("renders with slot content", () => {
    const wrapper = mount(FTag, {
      slots: {
        label: "<span>自定义内容</span>",
      },
    });
    expect(wrapper.html()).toContain("自定义内容");
  });
});
