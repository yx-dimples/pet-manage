<template>
  <CommodityDetail :is-edit="false"></CommodityDetail>
</template>

<script>
import CommodityDetail from './components/CommodityDetail.vue'

export default {
  name: 'addBusiness',
  components: {
    CommodityDetail
  }
}
</script>
