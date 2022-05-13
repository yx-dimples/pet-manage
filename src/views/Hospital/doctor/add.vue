<template>
  <DoctorDetail :is-edit="false"></DoctorDetail>
</template>

<script>
import DoctorDetail from './components/DoctorDetail.vue'

export default {
  name: 'addDoctor',
  components: {
    DoctorDetail
  }
}
</script>
