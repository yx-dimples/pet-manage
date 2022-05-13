<template>
  <div class="root">
    <el-form
      :model="value"
      ref="doctorAttrForm"
      label-width="120px"
      style="width: 600px"
      size="small"
    >
      <el-form-item label="医生简介：">
        <el-input v-model="value.introduce" type="textarea" />
      </el-form-item>
      <el-form-item label="医生擅长：">
        <el-input v-model="value.expertise" type="textarea" />
      </el-form-item>
      <el-form-item label="医院地址：">
        <el-input v-model="value.address" type="textarea" />
      </el-form-item>
      <el-form-item label="医生照片：">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8080/api/upload/add"
          :show-file-list="false"
          :on-success="uploadImg"
          :before-upload="beforeImgUpload"
        >
          <img
            v-if="value.image_url"
            :src="imgBaseURL + '/' + value.image_url"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="医院类型：">
        <el-card hadow="never" class="cardBg">
          <el-checkbox-group
            v-model="categoryName"
            @change="handleCategoryName"
          >
            <el-checkbox
              v-for="(item, index) in doctorCategory"
              :key="index"
              :label="item.label"
            />
          </el-checkbox-group>
        </el-card>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev"
          >上一步，填写医生信息</el-button
        >
        <el-button type="primary" size="medium" @click="handleFinishCommit"
          >完成，提交医生</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { imgBaseURL, baseURL } from '@/config/url'
import { doctorCategory } from '@/api/getData'

export default {
  name: 'doctorAttrDetail',
  props: {
    modelValue: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      imgBaseURL,
      baseURL,
      doctorCategory: [],
      categoryName: []
    }
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
  created() {
    // console.log(this.value)
    // console.log(1)
    this.getDoctorCategory()
  },
  methods: {
    uploadImg(res, file) {
      // console.log(res)
      if (res.status === 1) {
        this.value.image_url = res.image_path
      } else {
        ElMessage({
          message: '上传图片失败！',
          type: 'error',
          duration: 1000
        })
      }
    },
    beforeImgUpload(file) {
      const isRightType =
        file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isRightType) {
        ElMessage({
          message: '上传头像图片只能是 JPG 格式!',
          type: 'error',
          duration: 1000
        })
      }
      if (!isLt2M) {
        ElMessage({
          message: '上传头像图片大小不能超过 2MB!',
          type: 'error',
          duration: 1000
        })
      }
      return isRightType && isLt2M
    },
    async getDoctorCategory() {
      const res = await doctorCategory()
      // console.log(res.data)
      this.doctorCategory = res.data

      if (this.value.category_name) {
        // console.log(this.value.category_name.split('|'))
        this.categoryName = this.value.category_name.split('|')
      }
    },
    handleCategoryName(val) {
      // console.log(val)
      this.categoryName = val
    },
    handlePrev() {
      this.$refs.doctorAttrForm.validate((valid) => {
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
      this.$refs.doctorAttrForm.validate((valid) => {
        if (valid) {
          this.$emit('finishCommit', this.isEdit, this.categoryName)
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
