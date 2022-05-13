<template>
  <CommodityDetail :is-edit="true"></CommodityDetail>
</template>

<script>
import CommodityDetail from './components/CommodityDetail.vue'

export default {
  name: 'updateBusiness',
  components: {
    CommodityDetail
  }
}
</script>
