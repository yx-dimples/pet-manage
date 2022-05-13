<template>
  <div>
    <el-card>
      <span class="font-title-medium">退货商品</span>
      <el-table class="distance" border :data="productList">
        <el-table-column label="商品图片" width="160" align="center">
          <template v-slot="scope">
            <el-image
              style="width: 140px; height: 140px"
              :src="imgBaseURL + '/' + scope.row.img"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template v-slot="scope">{{ scope.row.name }} </template>
        </el-table-column>
        <el-table-column label="价格" width="160" align="center">
          <template v-slot="scope">
            ￥{{ scope.row.price.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column label="属性" width="160" align="center">
          <template v-slot="scope">
            {{ scope.row.new_specs_0 }}： {{ scope.row.new_specs_1 }}
          </template>
        </el-table-column>
        <el-table-column label="数量" width="100" align="center">
          <template v-slot="scope">
            {{ scope.row.quantity }}
          </template>
        </el-table-column>
        <el-table-column label="合计" width="100" align="center">
          <template v-slot="scope">
            ￥ {{ (scope.row.price * scope.row.quantity).toFixed(2) }}
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right; margin-top: 15px; margin-bottom: 15px">
        <span class="font-title-medium">合计：</span>
        <span class="font-title-medium color-danger">￥{{ totalAmount }}</span>
      </div>
    </el-card>

    <el-card class="distance">
      <span class="font-title-medium">服务单信息</span>
      <div class="form-container-border">
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small"
            >服务单号</el-col
          >
          <el-col class="form-border font-small" :span="18"
            >{{ orderReturnApply._id }}
            <el-button type="text" size="small" @click="handleViewOrder"
              >查看</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small"
            >订单状态</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            formStatus(orderReturnApply.status)
          }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small"
            >订单编号</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            orderReturnApply.order_id
          }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small"
            >申请时间</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            orderReturnApply.applyTime
          }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small"
            >用户账号</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            orderReturnApply.username
          }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small"
            >联系人</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            orderReturnApply.contactName
          }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small"
            >联系电话</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            orderReturnApply.contactPhone
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >退货原因</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            orderReturnApply.refund_reason
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >问题描述</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            orderReturnApply.user_question_desc
          }}</el-col>
        </el-row>
        <el-row>
          <el-col
            class="form-border form-left-bg font-small"
            :span="6"
            style="height: 100px; line-height: 80px"
            >凭证图片
          </el-col>
          <el-col
            class="form-border font-small"
            :span="18"
            style="height: 100px"
          >
            <img
              v-for="(item, index) in proofPics"
              style="width: 80px; height: 80px"
              :src="item.url"
              :key="index"
            />
          </el-col>
        </el-row>
      </div>
      <div class="form-container-border">
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >订单金额</el-col
          >
          <el-col class="form-border font-small" :span="18"
            >￥{{ orderReturnApply.pay_amount }}</el-col
          >
        </el-row>
        <el-row>
          <el-col
            class="form-border form-left-bg font-small"
            style="height: 52px; line-height: 32px"
            :span="6"
            >确认退款金额</el-col
          >
          <el-col class="form-border font-small" :span="18">
            ￥
            <el-input
              size="small"
              v-model="updateStatusParam.returnAmount"
              :disabled="orderReturnApply.status !== 5"
              style="width: 200px; margin-left: 5px"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >收货人姓名</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            updateStatusParam.currentName
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >所在区域</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            updateStatusParam.currentAddress
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >详细地址</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            updateStatusParam.detailAddress
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >联系电话</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            updateStatusParam.currentPhone
          }}</el-col>
        </el-row>
      </div>
      <div class="form-container-border" v-show="orderReturnApply.status === 5">
        <el-row>
          <el-col
            class="form-border form-left-bg font-small"
            style="height: 52px; line-height: 32px"
            :span="6"
            >处理备注</el-col
          >
          <el-col class="form-border font-small" :span="18">
            <el-input
              size="small"
              style="width: 200px; margin-left: 10px"
              v-model="updateStatusParam.handleNote"
            />
          </el-col>
        </el-row>
      </div>
      <div class="form-container-border" v-show="orderReturnApply.status !== 5">
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >处理人员</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            orderReturnApply.handleName
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >处理时间</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            orderReturnApply.handleTime
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >处理备注</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            orderReturnApply.handleNote
          }}</el-col>
        </el-row>
      </div>
      <div class="form-container-border" v-show="orderReturnApply.status === 6">
        <el-row>
          <el-col
            class="form-border form-left-bg font-small"
            style="height: 52px; line-height: 32px"
            :span="6"
            >收货备注</el-col
          >
          <el-col class="form-border font-small" :span="18">
            <el-input
              size="small"
              style="width: 200px; margin-left: 10px"
              v-model="updateStatusParam.receiveNote"
            />
          </el-col>
        </el-row>
      </div>
      <div class="form-container-border" v-show="orderReturnApply.status === 7">
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >收货人员</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            orderReturnApply.handleName
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >收货时间</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            orderReturnApply.receiveTime
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >处理备注</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            orderReturnApply.receiveNote
          }}</el-col>
        </el-row>
      </div>
      <div
        style="margin-top: 15px; text-align: center"
        v-show="orderReturnApply.status === 5"
      >
        <el-button size="small" type="primary" @click="handleUpdateStatus(6)"
          >确认退货</el-button
        >
        <el-button size="small" type="danger" @click="handleUpdateStatus(8)"
          >拒绝退货</el-button
        >
      </div>
      <div
        style="margin-top: 15px; text-align: center"
        v-show="orderReturnApply.status === 6"
      >
        <el-button size="small" type="primary" @click="handleUpdateStatus(7)"
          >确认收获</el-button
        >
      </div>
      <div
        style="margin-top: 15px; text-align: center"
        v-show="orderReturnApply.status === 7 || orderReturnApply.status === 8"
      >
        <el-button size="small" type="primary" @click="handleRouterBack"
          >返回</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
import { getOrderDetail, updateApplyStatus } from '@/api/getData'
import { imgBaseURL } from '@/config/url'
import { formStatus } from '@/utils/index'
import { ElMessageBox, ElMessage } from 'element-plus'

const defaultUpdateStatusParam = {
  returnAmount: 0, // 处理备注
  handleNote: null,
  currentAddress: '广东省 深圳市 南山区',
  detailAddress: '科兴科学园',
  currentPhone: '18001010232',
  currentName: '大周',
  status: 0,
  receiveNote: null // 收货备注
}

export default {
  name: 'applyDetail',
  data() {
    return {
      id: null,
      productList: [],
      imgBaseURL,
      orderReturnApply: {},
      formStatus,
      proofPics: null,
      updateStatusParam: Object.assign({}, defaultUpdateStatusParam)
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getDetail()
  },
  computed: {
    totalAmount() {
      if (this.orderReturnApply != null) {
        let totalPrice
        if (this.orderReturnApply.refund_amount) {
          const totalAmount = this.orderReturnApply.refund_amount
          totalPrice = totalAmount.toFixed(2)
        }
        return totalPrice
      } else {
        return 0.0
      }
    }
  },
  methods: {
    async getDetail() {
      await getOrderDetail(this.id).then((response) => {
        this.orderReturnApply = response.data
        console.log(response.data)
        this.productList = response.data.cartList
        // 退货中和完成
        if (response.data.status === 5 || response.data.status === 6) {
          this.updateStatusParam.returnAmount = response.data.refund_amount
        }
      })
    },
    handleViewOrder() {
      this.$router.push({
        path: '/oms/orderDetail',
        query: { id: this.orderReturnApply._id }
      })
    },
    handleUpdateStatus(status) {
      this.updateStatusParam.status = status
      ElMessageBox.alert('是否要进行此操作?', '提示', {
        confirmButtonText: 'OK'
      })
        .then(async () => {
          await updateApplyStatus(this.id, this.updateStatusParam).then(
            (response) => {
              if (response.data.status === 0) {
                ElMessage({
                  type: 'success',
                  message: '操作成功!',
                  duration: 1000
                })
                this.$router.back()
              }
            }
          )
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消删除'
          })
        })
    },
    handleRouterBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
.distance {
  margin-top: 20px;
}
.font-title-medium {
  font-size: 16px;
  color: #303133;
}
.color-danger {
  color: #f56c6c;
}
.detail-container {
  position: absolute;
  left: 0;
  right: 0;
  width: 1080px;
  padding: 35px 35px 15px 35px;
  margin: 20px auto;
}
.standard-margin {
  margin-top: 15px;
}
.form-border {
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
}
.form-container-border {
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
  margin-top: 15px;
}
.form-left-bg {
  background: #f2f6fc;
}
</style>
