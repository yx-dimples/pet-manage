<template>
  <el-card class="root">
    <el-form
      :rules="rules"
      :model="businessParam"
      label-width="130px"
      ref="businessDetailForm"
    >
      <el-form-item label="商家名称：" prop="name">
        <el-input v-model="businessParam.name" />
      </el-form-item>
      <el-form-item label="商家地址：" prop="address">
        <el-autocomplete
          v-model="businessParam.address"
          :fetch-suggestions="querySearchAsync"
          clearable
          placeholder="请输入地址"
          style="width: 100%"
          @select="addressSelect"
        />
        <span>当前城市：{{ city.name }}</span>
      </el-form-item>
      <el-form-item label="联系电话：" prop="phone">
        <el-input v-model="businessParam.phone" />
      </el-form-item>
      <el-form-item label="商家公告：">
        <el-input v-model="businessParam.promotion_info" />
      </el-form-item>
      <el-form-item label="商家特点：">
        <el-checkbox-group
          v-model="businessParam.deliveryMode"
          @change="handleDeliveryModeChange"
        >
          <el-checkbox label="同城配送" />
          <el-checkbox label="到店自提" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="配送费：" prop="float_delivery_fee">
        <el-input-number
          v-model="businessParam.float_delivery_fee"
          :min="0"
          :max="20"
        />
      </el-form-item>
      <el-form-item label="起送价：" prop="float_minimum_order_amount">
        <el-input-number
          v-model="businessParam.float_minimum_order_amount"
          :min="0"
          :max="100"
        />
      </el-form-item>
      <el-form-item label="营业时间" style="white-space: nowrap">
        <el-time-select
          placeholder="起始时间"
          v-model="businessParam.startTime"
          start="09:00"
          step="1:00"
          end="22:00"
        >
        </el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="businessParam.endTime"
          minTime="businessParam.startTime"
          step="1:00"
          end="22:00"
        >
        </el-time-select>
      </el-form-item>
      <el-form-item label="上传店铺头像：">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8080/api/upload/add"
          :show-file-list="false"
          :on-success="uploadImg"
          :before-upload="beforeImgUpload"
        >
          <img
            v-if="businessParam.image_url"
            :src="imgBaseURL + '/' + businessParam.image_url"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="优惠活动：">
        <el-select
          v-model="activityValue"
          @change="selectActivity"
          :placeholder="activityValue"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-table
        :data="businessParam.activities"
        stripe
        style="width: 80%; margin: 20px auto"
        align="cneter"
      >
        <el-table-column
          prop="icon_name"
          label="活动标题"
          align="cneter"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="活动名称"
          align="cneter"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="description" align="cneter" label="活动详情">
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template v-slot="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-form-item>
        <el-button type="primary" @click="finishCommit"
          >完成,提交商店</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { ElMessageBox, ElMessage } from 'element-plus'
import {
  businessDetail,
  cityGuess,
  searchplace,
  updateBusiness,
  addBusiness
} from '@/api/getData'
import { imgBaseURL } from '@/config/url'
const defaultBusinessParam = {
  name: '',
  address: '',
  latitude: '',
  longitude: '',
  phone: '',
  promotion_info: '',
  deliveryMode: [],
  float_delivery_fee: 0,
  float_minimum_order_amount: 0,
  startTime: '',
  endTime: '',
  activities: []
}

export default {
  components: {},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      businessParam: Object.assign({}, defaultBusinessParam),
      rules: {
        name: [{ required: true, message: '请输入商家名称', trigger: 'blur' }],
        address: [
          { required: true, message: '请输入商家地址', trigger: 'blur' }
        ],
        phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        float_delivery_fee: [
          { required: true, message: '请输入配送费', trigger: 'blur' }
        ],
        float_minimum_order_amount: [
          { required: true, message: '请输入起送价', trigger: 'blur' }
        ]
      },
      city: {},
      imgBaseURL,
      activityValue: '部分商品优惠',
      options: [
        {
          value: '部分商品优惠',
          label: '部分商品优惠'
        },
        {
          value: '部分商品折扣',
          label: '部分商品折扣'
        },
        {
          value: '配送费满减',
          label: '配送费满减'
        }
      ]
    }
  },
  created() {
    if (this.isEdit) {
      businessDetail(this.$route.query.id).then((res) => {
        this.businessParam = res.data
        if (this.businessParam.delivery_mode) {
          this.businessParam.deliveryMode =
            this.businessParam.delivery_mode.split('|')
          if (
            this.businessParam.float_delivery_fee ===
            '提交订单时，会根据距离和重量计算'
          ) {
            this.businessParam.float_delivery_fee = 0
          }
          if (this.businessParam.opening_hours) {
            const openingHours = this.businessParam.opening_hours[0].split('-')
            this.businessParam.startTime = openingHours[0]
            this.businessParam.endTime = openingHours[1]
          }
        }
      })
    }
    this.initData()
  },
  methods: {
    async initData() {
      const res = await cityGuess()
      // console.log(res.data, 'city')
      this.city = res.data
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
      this.businessParam.latitude = address.latitude
      this.businessParam.longitude = address.longitude
    },
    handleDeliveryModeChange(val) {
      this.businessParam.deliveryMode = val
    },
    uploadImg(res, file) {
      // console.log(res)
      if (res.status === 1) {
        this.businessParam.image_url = res.image_path
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
    selectActivity() {
      ElMessageBox.prompt('请输入活动详情', '提示', {
        confirmButtonText: '确定'
      })
        .then((value) => {
          if (value === null) {
            ElMessage({
              type: 'success',
              message: '提交成功',
              duration: 1000
            })
          }
          let newObj = {}
          switch (this.activityValue) {
            case '部分商品优惠':
              newObj = {
                icon_name: '减',
                name: '部分商品:',
                description: value.value
              }
              break
            case '部分商品折扣':
              newObj = {
                icon_name: '折',
                name: '',
                description: value.value
              }
              break
            case '配送费满减':
              newObj = {
                icon_name: '减',
                name: '配送费满减:',
                description: value.value
              }
              break
          }
          this.businessParam.activities.push(newObj)
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消'
          })
        })
    },
    handleDelete(index) {
      this.businessParam.activities.splice(index, 1)
    },
    // 完成
    finishCommit() {
      ElMessageBox.alert('是否要提交该商家?', '提示', {
        confirmButtonText: 'OK'
      })
        .then(() => {
          if (this.isEdit) {
            updateBusiness(this.$route.query.id, this.businessParam).then(
              (response) => {
                console.log(response.data.status === 0)
                if (response.data.status === 0) {
                  ElMessage({
                    type: 'success',
                    message: '提交成功',
                    duration: 1000
                  })
                  this.$router.back()
                }
              }
            )
          } else {
            addBusiness(this.businessParam).then((response) => {
              if (response.data.status === 0) {
                ElMessage({
                  type: 'success',
                  message: '提交成功',
                  duration: 1000
                })
                this.$router.back()
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

<style>
.button_submit {
  text-align: center;
}
.el-table .info-row {
  background: #c9e5f5;
}
.el-table .positive-row {
  background: #e2f0e4;
}
</style>
