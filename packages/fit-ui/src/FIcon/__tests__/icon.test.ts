import FIcon from "..";
import { shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

describe("FIcon", () => {
  test("renders icon class", () => {
    const wrapper = shallowMount(FIcon, {
      props: { icon: "github" },
    });
    expect(wrapper.find("i").exists()).toBe(true);
  });

  test("color prop sets color style", () => {
    const wrapper = shallowMount(FIcon, {
      props: { icon: "github", color: "#ff0000" },
    });
    expect(wrapper.attributes("style")).toContain("color:");
  });

  test("spin prop adds spin class", () => {
    const wrapper = shallowMount(FIcon, {
      props: { icon: "github", spin: true },
    });
    expect(wrapper.classes()).toContain("f-icon--spin");
  });
});
