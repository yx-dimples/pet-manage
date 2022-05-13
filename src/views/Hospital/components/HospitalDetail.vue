<template>
  <el-card>
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写医院信息" />
      <el-step title="填写医院属性" />
    </el-steps>
    <HospitalInfoDetail
      v-show="showStatus[0]"
      v-model="hospitalParam"
      :id-edit="isEdit"
      @nextStep="nextStep"
    />
    <HospitalAttrDetail
      v-show="showStatus[1]"
      v-model="hospitalParam"
      :id-edit="isEdit"
      @prevStep="prevStep"
      @finishCommit="finishCommit"
    />
  </el-card>
</template>

<script>
import { ElMessageBox, ElMessage } from 'element-plus'
import HospitalInfoDetail from './HospitalInfoDetail.vue'
import HospitalAttrDetail from './HospitalAttrDetail.vue'
import { hospitalDetail, updateHospital, addHospital } from '@/api/getData'

const defaultProductParam = {
  hospitalcategoryID: 0,
  address: '',
  name: '',
  phone: '',
  img_url: '',
  introduce: '',
  expertise: '',
  wash_name: '',
  services: [],
  medical_name: '',
  currency_name: '',
  parking_name: '',
  different_name: '',
  specialty_name: '',
  details_url: '',
  latitude: '',
  longitude: ''
}

export default {
  name: 'hospitalDetail',
  components: {
    HospitalInfoDetail,
    HospitalAttrDetail
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: 0,
      showStatus: [true, false],
      hospitalParam: Object.assign({}, defaultProductParam)
    }
  },
  created() {
    if (this.isEdit) {
      hospitalDetail(this.$route.query.id).then((res) => {
        this.hospitalParam = res.data
        // console.log(this.hospitalParam)
      })
    }
  },
  methods: {
    hideAll() {
      for (let i = 0; i < this.showStatus.length; i++) {
        this.showStatus[i] = false
      }
    },
    // 下一步
    nextStep() {
      if (this.active < this.showStatus.length - 1) {
        this.active++
        this.hideAll()
        this.showStatus[this.active] = true
      }
    },
    // 上一步
    prevStep() {
      if (this.active > 0 && this.active < this.showStatus.length) {
        this.active--
        this.hideAll()
        this.showStatus[this.active] = true
      }
    },
    // 完成
    finishCommit(isEdit, params) {
      const hospitalParam = this.hospitalParam
      const data = { hospitalParam, params }

      ElMessageBox.alert('是否要提交该医院?', '提示', {
        confirmButtonText: 'OK'
      })
        .then(() => {
          // console.log(hospitalParam)
          if (this.isEdit) {
            updateHospital(this.$route.query.id, data).then((response) => {
              ElMessage({
                type: 'success',
                message: '提交成功',
                duration: 1000
              })
              this.$router.back()
            })
          } else {
            addHospital(data).then((response) => {
              ElMessage({
                type: 'success',
                message: '提交成功',
                duration: 1000
              })
              this.$router.back()
            })
          }
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消'
          })
        })
    }
  }
}
</script>
