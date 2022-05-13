<template>
  <div class="root">
    <el-form
      :model="value"
      ref="beauticianAttrForm"
      label-width="120px"
      style="width: 600px"
      size="small"
    >
      <el-form-item label="美容师简介：">
        <el-input v-model="value.introduce" type="textarea" />
      </el-form-item>
      <el-form-item label="美容师照片：">
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
      <el-form-item label="荣誉展示：">
        <el-upload
          action="http://localhost:8080/api/upload/add"
          list-type="picture-card"
          :file-list="filePathList"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" />
        </el-dialog>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev"
          >上一步，填写美容师信息</el-button
        >
        <el-button type="primary" size="medium" @click="handleFinishCommit"
          >完成,提交美容师</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { imgBaseURL, baseURL } from '@/config/url'

export default {
  name: 'beauticianAttrDetail',
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
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false
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
    },
    filePathList() {
      if (this.value.works) {
        this.value.works.split('|').map((item) => {
          this.fileList.push({ url: imgBaseURL + '/' + item })
        })
      }
      return this.fileList
    }
  },
  methods: {
    uploadImg(res, file) {
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
    emitInput(fileList) {
      const value = []
      for (let i = 0; i < fileList.length; i++) {
        value.push(fileList[i].url)
      }
      this.$emit('input', value)
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      this.emitInput(fileList)
    },
    // 文件上传成功时的钩子
    handleUploadSuccess(res, file) {
      console.log(res)
      if (res.status === 1) {
        this.dialogImageUrl = res.image_path
      } else {
        ElMessage({
          message: '上传图片失败！',
          type: 'error',
          duration: 1000
        })
      }
    },
    handlePrev() {
      this.$refs.beauticianAttrForm.validate((valid) => {
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
      this.$refs.beauticianAttrForm.validate((valid) => {
        if (valid) {
          this.$emit('finishCommit', this.isEdit, this.dialogImageUrl)
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
  .avatar-uploader .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    text-align: center;
  }
  .cardBg {
    background: #f8f9fc;
  }
}
</style>
