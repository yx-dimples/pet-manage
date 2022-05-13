<template>
  <el-card shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写医生信息"></el-step>
      <el-step title="填写医生属性"></el-step>
    </el-steps>
    <DoctorInfoDetail
      v-show="showStatus[0]"
      v-model="productParam"
      :id-edit="isEdit"
      @nextStep="nextStep"
    />
    <DoctorAttrDetail
      v-show="showStatus[1]"
      v-model="productParam"
      :id-edit="isEdit"
      @nextStep="nextStep"
      @finishCommit="finishCommit"
    />
  </el-card>
</template>

<script>
import { doctorDetail, updateDoctor, createDoctor } from '@/api/getData'
import DoctorInfoDetail from './DoctorInfoDetail.vue'
import DoctorAttrDetail from './DoctorAttrDetail.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
const defaultProductParam = {
  name: '',
  title: '',
  practice: '',
  expertise: '',
  introduce: '',
  address: '',
  image_url: '',
  category_name: ''
}

export default {
  name: 'doctorDetail',
  components: { DoctorInfoDetail, DoctorAttrDetail },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: 0,
      productParam: Object.assign({}, defaultProductParam),
      showStatus: [true, false],
      hospital_id: ''
    }
  },
  async created() {
    if (this.isEdit) {
      await doctorDetail(this.$route.query.id).then((response) => {
        this.productParam = response.data
      })
    } else {
      if (this.$route.query.hospital_id) {
        this.hospital_id = this.$route.query.hospital_id
      } else {
        ElMessageBox.alert(
          '添加医生需要选择一个医院，先去就去选择医院吗？',
          '提示',
          {
            confirmButtonText: 'OK'
          }
        )
          .then(() => {
            this.$router.push('/hms/hospitalList')
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '取消'
            })
          })
      }
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
    finishCommit(isEdit, categoryName) {
      console.log(categoryName)
      ElMessageBox.alert('是否要提交该医生?', '提示', {
        confirmButtonText: 'OK'
      })
        .then(async () => {
          if (this.isEdit) {
            const data = {
              categoryName,
              ...this.productParam
            }
            await updateDoctor(this.$route.query.id, data).then((response) => {
              console.log(response.data.status)
              if (response.data.status === 0) {
                ElMessage({
                  type: 'success',
                  message: '更新成功'
                })
                this.$router.back()
              }
            })
          } else {
            const hospitalId = this.hospital_id
            const data = {
              categoryName,
              hospitalId,
              ...this.productParam
            }
            await createDoctor(data).then((response) => {
              console.log(response.data.status)
              if (response.data.status === 0) {
                ElMessage({
                  type: 'success',
                  message: '添加成功'
                })
                this.$router.push({ path: '/hms/doctorList' })
              }
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

<style></style>
