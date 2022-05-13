<template>
  <el-card shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写美容师信息"></el-step>
      <el-step title="填写美容师属性"></el-step>
    </el-steps>
    <BeauticianInfoDetail
      v-show="showStatus[0]"
      v-model="productParam"
      :id-edit="isEdit"
      @nextStep="nextStep"
    />
    <BeauticianAttrDetail
      v-show="showStatus[1]"
      v-model="productParam"
      :id-edit="isEdit"
      @nextStep="nextStep"
      @finishCommit="finishCommit"
    />
  </el-card>
</template>

<script>
import {
  beauticianDetail,
  updateBeautician,
  createBeautician
} from '@/api/getData'
import BeauticianInfoDetail from './BeauticianInfoDetail.vue'
import BeauticianAttrDetail from './BeauticianAttrDetail.vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const defaultProductParam = {
  name: '',
  title: '',
  practice: '',
  introduce: '',
  image_url: '',
  works: '',
  albumPics: ''
}

export default {
  name: 'doctorDetail',
  components: { BeauticianInfoDetail, BeauticianAttrDetail },
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
      await beauticianDetail(this.$route.query.id).then((response) => {
        this.productParam = response.data
        console.log(response.data)
      })
    } else {
      if (this.$route.query.hospital_id) {
        this.hospital_id = this.$route.query.hospital_id
      } else {
        ElMessageBox.alert(
          '添加美容师需要选择一个医院，先去就去选择医院吗？',
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
    finishCommit(isEdit, filePathList) {
      ElMessageBox.alert('是否要提交该医生?', '提示', {
        confirmButtonText: 'OK'
      })
        .then(async () => {
          if (this.isEdit) {
            const data = {
              filePathList,
              ...this.productParam
            }
            await updateBeautician(this.$route.query.id, data).then(
              (response) => {
                console.log(response.data.status)
                if (response.data.status === 0) {
                  ElMessage({
                    type: 'success',
                    message: '更新成功'
                  })
                  this.$router.back()
                }
              }
            )
          } else {
            const hospitalId = this.hospital_id
            const data = {
              filePathList,
              hospitalId,
              ...this.productParam
            }
            await createBeautician(data).then((response) => {
              console.log(response.data.status)
              if (response.data.status === 0) {
                ElMessage({
                  type: 'success',
                  message: '添加成功'
                })
                this.$router.push({ path: '/hms/beauticianList' })
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
