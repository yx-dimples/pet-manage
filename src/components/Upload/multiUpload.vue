<template>
  <div>
    <el-upload
      action="http://localhost:8080/api/upload/add"
      :data="useOss ? dataObj : null"
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :limit="maxCount"
      :on-exceed="handleExceed"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import { imgBaseURL } from '@/config/url'
export default {
  name: 'multiUpload',
  props: {
    // 图片属性数组
    modelValue: String,
    // 最大上传图片数量
    maxCount: {
      type: Number,
      default: 5
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
    fileList() {
      const fileList = []
      // console.log(this.value, '1111')
      this.value.split('|').map((item) => {
        fileList.push({ url: imgBaseURL + '/' + item })
      })
      return fileList
    }
  },
  data() {
    return {
      dataObj: {
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        dir: '',
        host: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      useOss: true
    }
  },
  methods: {
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
      const url = this.dataObj.host + '/' + this.dataObj.dir + '/' + file.name
      this.fileList.push({ name: file.name, url: url })
      this.emitInput(this.fileList)
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
      this.dialogVisible = true
      this.dialogImageUrl = file.url
    },
    // 当超出限制时，执行的钩子函数
    handleExceed(files, fileList) {
      this.$message({
        message: '最多只能上传' + this.maxCount + '张图片',
        type: 'warning',
        duration: 1000
      })
    },
    // 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。
    beforeUpload(file) {
      const isRightType =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/webp'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isRightType) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isRightType && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped></style>
