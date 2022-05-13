<template>
  <div class="root">
    <el-card shadow="never">
      <div class="form-container-border">
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >预约医院</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            rezDetails.hospital_name
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >预约类型</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            rezItemtype
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >宠物名称</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            rezDetails.pet_name
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >预约时间</el-col
          >
          <el-col class="form-border font-small" :span="18"
            >{{ rezDetails.date }}&nbsp;{{ rezDetails.hour }}</el-col
          >
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >预约医生</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            rezDetails.doctor_name
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >挂号费</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            rezDetails.price
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >预约备注</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            rezItemRemarks
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >状态</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            rezItemStaus
          }}</el-col>
        </el-row>
      </div>
      <div
        style="margin-top: 15px; text-align: center"
        v-show="rezDetails.status === 0"
      >
        <el-button size="small" @click="handleStatus(0)">确认挂号</el-button>
      </div>
      <div
        style="margin-top: 15px; text-align: center"
        v-show="rezDetails.status === 1"
      >
        <el-button size="small" @click="handleStatus(1)">返回</el-button>
      </div>
      <div
        style="margin-top: 15px; text-align: center"
        v-show="rezDetails.status === 2"
      >
        <el-button size="small" @click="handleStatus(2)">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ElMessageBox, ElMessage } from 'element-plus'
import { rezDetail, rezItem } from '@/api/getData'
export default {
  name: 'rezInfo',
  data() {
    return {
      rezDetails: {}
    }
  },
  computed: {
    rezItemtype() {
      let type
      const value = this.rezDetails.type
      if (value === 'wash') {
        type = '预约洗美'
      } else if (value === 'register') {
        type = '预约挂号'
      }
      return type
    },
    rezItemStaus() {
      let type
      const value = this.rezDetails.status
      if (value === 0) {
        type = '待确认'
      } else if (value === 1) {
        type = '已取号/已支付'
      } else if (value === 2) {
        type = '已取消'
      }
      return type
    },
    rezItemRemarks() {
      let type
      const value = this.rezDetails.remarks
      if (value === '') {
        type = '无'
      } else {
        type = value
      }
      return type
    }
  },
  created() {
    this.rezDetail()
  },
  methods: {
    async rezDetail() {
      try {
        const res = await rezDetail(this.$route.query.id)
        if (res.status === 200) {
          this.rezDetails = res.data
        }
      } catch (err) {
        console.log('获取数据失败')
      }
    },
    handleStatus(status) {
      if (status === 1 || status === 2) {
        this.$router.back()
      } else if (status === 0) {
        ElMessageBox.alert('是否要确认预约?', '提示', {
          confirmButtonText: 'OK'
        })
          .then(async () => {
            const res = await rezItem()
            // console.log(res)
            if (res.data.status === 0) {
              ElMessage({
                type: 'success',
                message: '预约成功'
              })
              this.rezDetail()
            }
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '取消删除'
            })
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.standard-margin {
  margin-top: 15px;
}
.root {
  .form-container-border {
    border-left: 1px solid #dcdfe6;
    border-top: 1px solid #dcdfe6;
    margin-top: 15px;
    .form-border {
      border-right: 1px solid #dcdfe6;
      border-bottom: 1px solid #dcdfe6;
      padding: 10px;
    }
    .form-left-bg {
      background: #f2f6fc;
    }
  }
}
</style>
