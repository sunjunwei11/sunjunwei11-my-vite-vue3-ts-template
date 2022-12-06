import HelloWorld from "./HelloWorld.vue";
import { mount } from "@vue/test-utils";

test("Test HelloWorld Props", () => {
  const wrapper = mount(HelloWorld, {
    props: {
      msg: "111111",
    },
  });

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain("111111");
});
