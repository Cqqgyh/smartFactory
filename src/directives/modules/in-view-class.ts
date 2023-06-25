import { Directive } from 'vue'

interface InViewDirectiveOptions {
  classes?: any[] | any
  repeat?: boolean
}

const inViewClass: Directive = {
  beforeMount(el, binding) {
    const options: InViewDirectiveOptions = {
      classes: Array.isArray(binding.value) ? binding.value : [binding.value],
      repeat: binding.modifiers.repeat,
      ...(binding.arg as unknown as InViewDirectiveOptions),
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add(...options.classes)
        } else {
          if (options.repeat) {
            el.classList.remove(...options.classes)
          }
        }
      })
    })

    observer.observe(el)

    el.__vue_inview_observer__ = observer
  },
  beforeUnmount(el, binding) {
    const observer = el.__vue_inview_observer__
    observer?.unobserve(el)
    if (!binding.modifiers.repeat) {
      el.classList.remove(
        ...(Array.isArray(binding.value) ? binding.value : [binding.value]),
      )
    }
  },
}

export default inViewClass

/**
 * @description
 * @param  {string} username
 * @docs  v-in-view.repeat 其中repeat表示元素离开可视区域后会自动将添加的类名卸载掉
 * 使用方式，在main.js中引入并注册
 * import inViewDirective from './direct/in-view-directive'
 * app.directive('in-view', inViewDirective);
 * 页面内直接使用
 *   <div v-in-view-class="'animate__animated,animate__bounce'" class=" box">哈哈哈</div>
 *   <div v-in-view-class.repeat="['animate__animated','animate__bounce']" class=" box">嘿嘿嘿</div>
 **/
