<template>
  <div class="root">
    <el-form
      :model="value"
      :rules="rules"
      ref="hospitalInfoForm"
      label-width="120px"
      style="width: 600px"
      size="small"
    >
      <el-form-item label="医院类型：" prop="hospitalcategoryID">
        <el-select v-model="value.hospitalcategoryID">
          <el-option
            v-for="item in hospitalcategoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="医院名字：" prop="name">
        <el-input v-model="value.name" />
      </el-form-item>
      <el-form-item label="医院地址：" prop="address">
        <el-autocomplete
          v-model="value.address"
          :fetch-suggestions="querySearchAsync"
          clearable
          placeholder="请输入医院地址"
          style="width: 100%"
          @select="addressSelect"
        />
        <span>当前城市：{{ city.name }}</span>
      </el-form-item>
      <el-form-item label="医院电话：">
        <el-input v-model="value.phone" />
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
            v-if="value.img_url"
            :src="imgBaseURL + '/' + value.img_url"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext"
          >下一步，填写医院属性</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { condition, searchplace, cityGuess } from '@/api/getData'
import { ElMessage } from 'element-plus'
import { imgBaseURL } from '@/config/url'
export default {
  name: 'hospitalInfoDetail',
  props: {
    modelValue: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {
        hospitalcategoryID: [
          { required: true, message: '请选择医院类型', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入医院名字', trigger: 'blur' }],
        address: [
          { required: true, message: '请输入医院地址', trigger: 'blur' }
        ]
      },
      // 选中医院分类的值
      hospitalcategoryValue: '',
      hospitalcategoryOptions: [],
      imgBaseURL,
      city: {}
    }
  },
  created() {
    this.getHospitalcategory()
    this.initData()
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
    async initData() {
      const res = await cityGuess()
      // console.log(res.data, 'city')
      this.city = res.data
    },
    async getHospitalcategory() {
      try {
        const res = await condition()
        const { hospitalType } = res.data
        const list = hospitalType.children
        this.hospitalcategoryOptions = []
        for (let i = 0; i < list.length; i++) {
          this.hospitalcategoryOptions.push({
            label: list[i].label,
            value: list[i].value
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async querySearchAsync(queryString, cb) {
      if (queryString) {
        const params = {
          type: 'search',
          city_id: this.city.id,
          keyword: queryString
        }
        const res = await searchplace(params)

        if (res.data instanceof Array) {
          res.data.map((item) => {
            item.value = item.address
            return item
          })
          cb(res.data)
        }
        try {
        } catch (err) {
          console.log(err)
        }
      }
    },
    addressSelect(address) {
      this.value.latitude = address.latitude
      this.value.longitude = address.longitude
    },
    uploadImg(res, file) {
      if (res.status === 1) {
        this.value.img_url = res.image_path
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
    handleNext() {
      this.$refs.hospitalInfoForm.validate((valid) => {
        if (valid) {
          this.$emit('nextStep')
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
