import { mount } from '@vue/test-utils'

// The component to test
const MessageComponent = {
  template: '<p>{{ msg }}</p>',
  props: ['msg']
}

test('displays message', () => {
  const wrapper = mount(MessageComponent, {
    props: {
      msg: 'Hello world'
    }
  })

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('Hello world')
})


// import App from '@/alert-message'
// import { mount } from '@vue/test-utils'

// describe('App', () => {
//     // Inspect the raw component options
//     it('has data', () => {
//       expect(typeof App.data).toBe('function')
//     })
//   })