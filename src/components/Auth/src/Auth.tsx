import { defineComponent, Fragment } from 'vue'
import { useAuthStore } from '@/store/modules/auth'

export default defineComponent({
  name: 'Auth',
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  setup(props, { slots }) {
    const authStore = useAuthStore()
    const currentPageRoles = authStore.authButtonList ?? []
    const hasPermission = props.value.every(
      (item) => item && currentPageRoles.includes(item as string),
    )
    return () => {
      if (!slots) return null
      return hasPermission ? <Fragment>{slots.default?.()}</Fragment> : null
    }
  },
})
