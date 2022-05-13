<template>
  <BusinessDetail :is-edit="false"></BusinessDetail>
</template>

<script>
import BusinessDetail from './components/BusinessDetail.vue'

export default {
  name: 'addBusiness',
  components: {
    BusinessDetail
  }
}
</script>
