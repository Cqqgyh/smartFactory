// hover-class.ts

import { Directive, DirectiveBinding } from 'vue'

type ClassNames = string | string[]

const hoverClassDirective: Directive = {
  mounted(el, binding: DirectiveBinding<ClassNames>) {
    el.addEventListener('mouseenter', () => {
      const classNames = Array.isArray(binding.value)
        ? binding.value
        : [binding.value]
      el.classList.add(...classNames)
    })
    el.addEventListener('mouseleave', () => {
      const classNames = Array.isArray(binding.value)
        ? binding.value
        : [binding.value]
      el.classList.remove(...classNames)
    })
  },
}

export default hoverClassDirective
