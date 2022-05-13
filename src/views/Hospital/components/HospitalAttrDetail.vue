<template>
  <div class="root">
    <el-form :model="value" ref="hospitalAttrForm">
      <el-form-item label="医院介绍：">
        <el-input v-model="value.introduce" type="textarea" />
      </el-form-item>
      <el-form-item label="医院专长：">
        <el-input v-model="value.expertise" type="textarea" />
      </el-form-item>
      <el-form-item label="营业时间：">
        <div>
          <el-time-select
            v-model="startTime"
            start="00:00"
            step="1:00"
            end="24:00"
            placeholder="起始时间"
            size="small"
            @change="this.changeStartTime"
          />
          <el-time-select
            v-model="endTime"
            start="00:00"
            step="1:00"
            end="24:00"
            :min-time="startTime"
            placeholder="结束时间"
            size="small"
            @change="this.changeEndTime"
          />
        </div>
      </el-form-item>
      <el-form-item label="停车信息：">
        <el-input v-model="parkInfo" />
      </el-form-item>
      <el-form-item label="服务类型：">
        <el-card class="cardBg">
          <span>{{ wash.label }}：</span>
          <el-checkbox-group v-model="washName" @change="handleChangeWashName">
            <el-checkbox
              v-for="(item, index) in wash.children"
              :key="index"
              :label="item.label"
            />
          </el-checkbox-group>

          <span>{{ medical.label }}：</span>
          <el-checkbox-group
            v-model="medicalName"
            @change="handleChangeMedicalName"
          >
            <el-checkbox
              v-for="(item, index) in medical.children"
              :key="index"
              :label="item.label"
            />
          </el-checkbox-group>

          <span>{{ currency.label }}：</span>
          <el-checkbox-group
            v-model="currencyName"
            @change="handleChangeCurrencyName"
          >
            <el-checkbox
              v-for="(item, index) in currency.children"
              :key="index"
              :label="item.label"
            />
          </el-checkbox-group>

          <span>{{ parking.label }}：</span>
          <el-checkbox-group
            v-model="parkingName"
            @change="handleChangeParkingName"
          >
            <el-checkbox
              v-for="(item, index) in parking.children"
              :key="index"
              :label="item.label"
            />
          </el-checkbox-group>

          <span>{{ different.label }}：</span>
          <el-checkbox-group
            v-model="differentName"
            @change="handleChangeDifferentName"
          >
            <el-checkbox
              v-for="(item, index) in different.children"
              :key="index"
              :label="item.label"
            />
          </el-checkbox-group>

          <span>{{ specialty.label }}：</span>
          <el-checkbox-group
            v-model="specialtyName"
            @change="handleChangeSpecialtyName"
          >
            <el-checkbox
              v-for="(item, index) in specialty.children"
              :key="index"
              :label="item.label"
            />
          </el-checkbox-group>
        </el-card>
      </el-form-item>
      <el-form-item label="医院相册：">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8080/api/upload/add"
          :show-file-list="false"
          :on-success="uploadImg"
          :before-upload="beforeImgUpload"
        >
          <img
            v-if="value.details_url"
            :src="imgBaseURL + '/' + value.details_url"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev"
          >上一步，填写医院信息</el-button
        >
        <el-button type="primary" size="medium" @click="handleFinishCommit"
          >完成,提交医院</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { condition } from '@/api/getData'
import { imgBaseURL } from '@/config/url'
export default {
  name: 'hospitalAttrDetail',
  props: {
    modelValue: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imgBaseURL,
      wash: [],
      washName: [],
      medical: [],
      medicalName: [],
      currency: [],
      currencyName: [],
      parking: [],
      parkingName: [],
      different: [],
      differentName: [],
      specialty: [],
      specialtyName: [],
      startTime: '',
      endTime: '',
      parkInfo: ''
    }
  },
  created() {
    this.getHospitalcategory()
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    async getHospitalcategory() {
      await condition().then((res) => {
        if (res.status === 200) {
          this.wash = res.data.wash
          this.medical = res.data.medical
          this.currency = res.data.currency
          this.parking = res.data.parking
          this.different = res.data.different
          this.specialty = res.data.specialty
          if (
            this.value.wash_name ||
            this.value.medical_name ||
            this.value.currency_name ||
            this.value.parking_name ||
            this.value.different_name ||
            this.value.specialty_name
          ) {
            this.washName = this.value.wash_name.split('|')
            this.medicalName = this.value.medical_name.split('|')
            this.currencyName = this.value.currency_name.split('|')
            this.parkingName = this.value.parking_name.split('|')
            this.differentName = this.value.different_name.split('|')
            this.specialtyName = this.value.specialty_name.split('|')
          }
          if (this.value.services && this.value.services.length !== 0) {
            this.startTime = this.value.services[0].label.split('-')[0]
            this.endTime = this.value.services[0].label.split('-')[1]
            this.parkInfo = this.value.services[1].label
          }
        }
      })
    },
    changeStartTime(val) {
      this.startTime = val
      // console.log(this.value.services[0].label.split('-')[0])
    },
    changeEndTime(val) {
      this.endTime = val
    },
    handleChangeWashName(val) {
      this.washName = val
    },
    handleChangeMedicalName(val) {
      this.medicalName = val
    },
    handleChangeCurrencyName(val) {
      this.currencyName = val
    },
    handleChangeParkingName(val) {
      this.parkingName = val
    },
    handleChangeDifferentName(val) {
      this.differentName = val
    },
    handleChangeSpecialtyName(val) {
      this.specialtyName = val
    },
    uploadImg(res, file) {
      if (res.status === 1) {
        this.value.details_url = res.image_path
      } else {
        ElMessage({
          message: '上传图片失败！',
          type: 'error',
          duration: 1000
        })
      }
    },
    beforeImgUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        ElMessage({
          message: '上传头像图片大小不能超过 2MB!',
          type: 'error',
          duration: 1000
        })
      }
      return isLt2M
    },
    handlePrev() {
      this.$refs.hospitalAttrForm.validate((valid) => {
        if (valid) {
          this.$emit('prevStep')
        } else {
          ElMessage({
            message: '验证失败',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    handleFinishCommit() {
      this.$refs.hospitalAttrForm.validate((valid) => {
        if (valid) {
          const washName = this.washName
          const currencyName = this.currencyName
          const parkingName = this.parkingName
          const differentName = this.differentName
          const specialtyName = this.specialtyName
          const medicalName = this.medicalName
          const startTime = this.startTime
          const endTime = this.endTime
          const parkInfo = this.parkInfo
          const params = {
            washName,
            currencyName,
            parkingName,
            differentName,
            specialtyName,
            medicalName,
            startTime,
            endTime,
            parkInfo
          }
          this.$emit('finishCommit', this.isEdit, params)
        } else {
          ElMessage({
            message: '验证失败',
            type: 'error',
            duration: 1000
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.root {
  margin-top: 20px;
  .cardBg {
    background: #f8f9fc;
  }
}
</style>
