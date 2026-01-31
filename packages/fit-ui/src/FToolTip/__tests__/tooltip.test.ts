import FToolTip from "..";
import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

describe("FToolTip", () => {
  test("mount with content", () => {
    const wrapper = mount(FToolTip, {
      props: {
        content: "提示文本",
      },
      slots: {
        default: "<button>悬停我</button>",
      },
    });
    
    expect(wrapper.html()).toContain("悬停我");
  });

  test("renders different positions", () => {
    const positions = ["top", "bottom", "left", "right"];
    positions.forEach((position) => {
      const wrapper = mount(FToolTip, {
        props: {
          content: "提示",
          position: position as any,
        },
        slots: {
          default: "<span>内容</span>",
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  test("renders different modes", () => {
    const modes = ["dark", "light", "custom"];
    modes.forEach((mode) => {
      const wrapper = mount(FToolTip, {
        props: {
          content: "提示文本",
          mode: mode as any,
        },
        slots: {
          default: "<span>内容</span>",
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  test("applies custom zIndex", () => {
    const wrapper = mount(FToolTip, {
      props: {
        content: "提示",
        zIndex: 5000,
      },
      slots: {
        default: "<span>内容</span>",
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  test("renders with slot content", () => {
    const wrapper = mount(FToolTip, {
      props: {
        content: "工具提示",
      },
      slots: {
        default: "<button class='test-btn'>测试按钮</button>",
      },
    });
    expect(wrapper.find(".test-btn").exists()).toBe(true);
    expect(wrapper.html()).toContain("测试按钮");
  });
});
