<template>
  <BeauticianDetail :is-edit="true"></BeauticianDetail>
</template>

<script>
import BeauticianDetail from './components/BeauticianDetail.vue'

export default {
  name: 'updateBeautician',
  components: {
    BeauticianDetail
  }
}
</script>
