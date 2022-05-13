<template>
  <HospitalDetail :is-edit="false"></HospitalDetail>
</template>

<script>
import HospitalDetail from './components/HospitalDetail.vue'

export default {
  name: 'updateHospital',
  components: {
    HospitalDetail
  }
}
</script>
