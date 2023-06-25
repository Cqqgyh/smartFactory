<template>
  <div class="panel">
    <div v-if="title" class="panel-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="panel-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  borderColor: {
    type: String,
    default: '#99fffe',
  },
})
</script>

<style scoped>
.panel {
  position: relative;
  z-index: 2;
  box-sizing: border-box;
  min-width: 300px;
  padding: 20px;
  color: #fff;
  background: rgb(0 34 51 / 60%)
    linear-gradient(v-bind('props.borderColor'), v-bind('props.borderColor'))
    linear-gradient(v-bind('props.borderColor'), v-bind('props.borderColor'))
    linear-gradient(v-bind('props.borderColor'), v-bind('props.borderColor'))
    linear-gradient(v-bind('props.borderColor'), v-bind('props.borderColor'))
    linear-gradient(v-bind('props.borderColor'), v-bind('props.borderColor'))
    linear-gradient(v-bind('props.borderColor'), v-bind('props.borderColor'))
    linear-gradient(v-bind('props.borderColor'), v-bind('props.borderColor'))
    linear-gradient(v-bind('props.borderColor'), v-bind('props.borderColor'))
    no-repeat left -3px top 0 left -3px top -3px right -3px top 0 right -3px top -3px
    left -3px bottom 0 left -3px bottom -3px right -3px bottom 0 right -3px bottom -3px;
  background-size: 3px 16px, 16px 3px;
  border: 1px solid transparent;
  backdrop-filter: blur(1px);
}

.panel-title {
  height: 0.5rem;
  margin-bottom: 0.1rem;
  font-size: 0.25rem;
  font-weight: bold;
  text-align: left;
}

.panel-content {
  font-size: 0.2rem;
}
</style>
