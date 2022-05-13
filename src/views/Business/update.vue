<template>
  <BusinessDetail :is-edit="true"></BusinessDetail>
</template>

<script>
import BusinessDetail from './components/BusinessDetail.vue'

export default {
  name: 'updateBusiness',
  components: {
    BusinessDetail
  }
}
</script>
