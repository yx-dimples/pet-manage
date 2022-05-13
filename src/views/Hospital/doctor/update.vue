<template>
  <DoctorDetail :is-edit="true"></DoctorDetail>
</template>

<script>
import DoctorDetail from './components/DoctorDetail.vue'

export default {
  name: 'updateDoctor',
  components: {
    DoctorDetail
  }
}
</script>
