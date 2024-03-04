import { mount } from '@vue/test-utils'
import { describe, expect, it, beforeEach } from 'vitest'
import NewTaskView from '../../views/NewTaskView.vue'
import { setActivePinia, createPinia } from 'pinia'

describe('NewTaskView component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('Checks title validation logic', async () => {
    const wrapper = mount(NewTaskView)

    const titleInput = wrapper.find('input#title')

    await titleInput.setValue('invalid')

    const errorMessage = wrapper.find('.title-error')
    expect(errorMessage.exists()).toBe(true)

    await titleInput.setValue('Valid Title')
    const updatedErrorMessage = wrapper.find('.title-error')
    expect(updatedErrorMessage.exists()).toBe(false)
  })

  it('Checks date validation logic', async () => {
    const wrapper = mount(NewTaskView)

    const completeByInput = wrapper.find('input#completeBy')

    const pastDate = new Date()
    pastDate.setDate(pastDate.getDate() - 1) // Set it to yesterday
    await completeByInput.setValue(pastDate.toISOString().split('T')[0])

    const errorMessage = wrapper.find('.date-error')
    expect(errorMessage.exists()).toBe(true)

    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 1) // Set it to tomorrow
    await completeByInput.setValue(futureDate.toISOString().split('T')[0])

    const updatedErrorMessage = wrapper.find('.date-error')
    expect(updatedErrorMessage.exists()).toBe(false)
  })
})
