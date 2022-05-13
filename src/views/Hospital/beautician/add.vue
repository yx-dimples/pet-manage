<template>
  <BeauticianDetail :is-edit="false"></BeauticianDetail>
</template>

<script>
import BeauticianDetail from './components/BeauticianDetail.vue'

export default {
  name: 'addBeautician',
  components: {
    BeauticianDetail
  }
}
</script>
