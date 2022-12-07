import HelloTsx from './HelloTsx';
import { mount } from '@vue/test-utils';

test('Test HelloWorld Props', () => {
  const wrapper = mount(HelloTsx, {});

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('This is tsx');
});
