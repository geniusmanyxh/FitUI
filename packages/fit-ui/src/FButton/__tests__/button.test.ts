import Button from "..";
import { shallowMount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";

describe("Button", () => {
  test("mount @vue/test-utils", () => {
    const wrapper = shallowMount(Button, {
      slots: { default: "Button" },
    });
    expect(wrapper.text()).toBe("Button");
  });

  test("type prop", () => {
    const wrapper = shallowMount(Button, {
      props: { type: "primary" },
      slots: { default: "Primary" },
    });
    expect(wrapper.classes()).toContain("primary_button");
  });

  test("disabled prop", () => {
    const wrapper = shallowMount(Button, {
      props: { disabled: true },
      slots: { default: "Disabled" },
    });
    expect(wrapper.classes()).toContain("is-disabled");
    expect(wrapper.attributes("disabled")).toBeDefined();
  });

  test("loading prop", () => {
    const wrapper = shallowMount(Button, {
      props: { loading: true },
      slots: { default: "Loading" },
    });
    expect(wrapper.classes()).toContain("is-loading");
    expect(wrapper.find(".f-button__loading").exists()).toBe(true);
  });

  test("circle prop", () => {
    const wrapper = shallowMount(Button, {
      props: { circle: true, icon: "search" },
    });
    expect(wrapper.classes()).toContain("f-button--circle");
  });

  test("link prop", () => {
    const wrapper = shallowMount(Button, {
      props: { link: true, type: "primary" },
      slots: { default: "Link" },
    });
    expect(wrapper.classes()).toContain("f-button--link");
  });

  test("text prop", () => {
    const wrapper = shallowMount(Button, {
      props: { text: true, type: "primary" },
      slots: { default: "Text" },
    });
    expect(wrapper.classes()).toContain("f-button--text");
  });

  test("nativeType prop", () => {
    const wrapper = shallowMount(Button, {
      props: { nativeType: "submit" },
      slots: { default: "Submit" },
    });
    expect(wrapper.attributes("type")).toBe("submit");
  });

  test("click event", async () => {
    const handleClick = vi.fn();
    const wrapper = shallowMount(Button, {
      props: { onClick: handleClick },
      slots: { default: "Click" },
    });
    await wrapper.trigger("click");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("disabled click does not emit", async () => {
    const handleClick = vi.fn();
    const wrapper = shallowMount(Button, {
      props: { disabled: true, onClick: handleClick },
      slots: { default: "Disabled" },
    });
    await wrapper.trigger("click");
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("loading click does not emit", async () => {
    const handleClick = vi.fn();
    const wrapper = shallowMount(Button, {
      props: { loading: true, onClick: handleClick },
      slots: { default: "Loading" },
    });
    await wrapper.trigger("click");
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("size prop", () => {
    const wrapper = shallowMount(Button, {
      props: { size: "large" },
      slots: { default: "Large" },
    });
    expect(wrapper.classes()).toContain("large_but");
  });

  test("round prop", () => {
    const wrapper = shallowMount(Button, {
      props: { round: true },
      slots: { default: "Round" },
    });
    expect(wrapper.classes()).toContain("button_round");
  });

  test("plain prop", () => {
    const wrapper = shallowMount(Button, {
      props: { plain: true, type: "primary" },
      slots: { default: "Plain" },
    });
    expect(wrapper.classes()).toContain("primary_button_plain");
  });
});
