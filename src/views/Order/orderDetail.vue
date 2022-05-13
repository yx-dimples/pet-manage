<template>
  <div class="app-container">
    <el-card shadow="never">
      <div class="operate-container">
        <el-icon style="margin-left: 20px"
          ><warning-filled class="color-danger"
        /></el-icon>
        <span class="color-danger"
          >&nbsp;当前订单状态：{{ formatStatus(order.status) }}</span
        >
        <div class="operate-button-container" v-show="order.status === 0">
          <el-button size="small" @click="handleDeleteOrder"
            >删除订单</el-button
          >

          <el-button size="small" @click="showMarkOrderDialog"
            >备注订单</el-button
          >
        </div>
        <div class="operate-button-container" v-show="order.status === 1">
          <el-button size="small" @click="showUpdateReceiverDialog"
            >修改收货人信息</el-button
          >
          <el-button size="small" @click="showCloseOrderDialog"
            >关闭订单</el-button
          >
          <el-button size="small" @click="showMarkOrderDialog"
            >备注订单</el-button
          >
        </div>
        <div class="operate-button-container" v-show="order.status === 2">
          <el-button size="small" @click="showLogisticsDialog"
            >订单跟踪</el-button
          >
          <el-button size="small" @click="showMarkOrderDialog"
            >备注订单</el-button
          >
        </div>
        <div class="operate-button-container" v-show="order.status === 3">
          <el-button size="small" @click="showLogisticsDialog"
            >订单跟踪</el-button
          >
          <el-button size="small" @click="showMarkOrderDialog"
            >备注订单</el-button
          >
        </div>
        <div class="operate-button-container" v-show="order.status === 4">
          <el-button size="small" @click="showUpdateReceiverDialog"
            >修改收货人信息</el-button
          >
          <el-button size="small" @click="showCloseOrderDialog"
            >关闭订单</el-button
          >
          <el-button size="small" @click="showMarkOrderDialog"
            >备注订单</el-button
          >
        </div>
      </div>
    </el-card>
    <div style="margin-top: 20px">
      <svg-icon icon="marker" style="color: #606266"></svg-icon>
      <span class="font-small">基本信息</span>
    </div>
    <div class="table-layout">
      <el-row>
        <el-col :span="4" class="table-cell-title">订单编号</el-col>
        <el-col :span="4" class="table-cell-title">用户id</el-col>
        <el-col :span="4" class="table-cell-title">支付方式</el-col>
        <el-col :span="4" class="table-cell-title">订单类型</el-col>
        <el-col :span="4" class="table-cell-title">配送方式</el-col>
        <el-col :span="4" class="table-cell-title">物流单号</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="table-cell">{{ order.order_id }}</el-col>
        <el-col :span="4" class="table-cell">{{ order.userid }}</el-col>
        <el-col :span="4" class="table-cell">{{ order.payment_method }}</el-col>
        <el-col :span="4" class="table-cell">{{
          formatOrderType(order.order_type)
        }}</el-col>
        <el-col :span="4" class="table-cell">{{
          order.deliveryCompany
        }}</el-col>
        <el-col :span="4" class="table-cell">{{ order.deliverySn }}</el-col>
      </el-row>
    </div>
    <div style="margin-top: 20px">
      <svg-icon icon="marker" style="color: #606266"></svg-icon>
      <span class="font-small">收货人信息</span>
    </div>
    <div class="table-layout">
      <el-row>
        <el-col :span="8" class="table-cell-title">收货人</el-col>
        <el-col :span="8" class="table-cell-title">手机号码</el-col>
        <el-col :span="8" class="table-cell-title">收货地址</el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="table-cell">{{ order.address_name }}</el-col>
        <el-col :span="8" class="table-cell">{{ order.address_phone }}</el-col>
        <el-col :span="8" class="table-cell"
          >{{ order.address }}{{ order.address_detail }}</el-col
        >
      </el-row>
    </div>
    <div style="margin-top: 20px">
      <svg-icon icon="marker" style="color: #606266"></svg-icon>
      <span class="font-small">商品信息</span>
    </div>
    <el-table
      ref="orderItemTable"
      :data="cartList"
      style="margin-top: 20px"
      size="small"
      stripe
      border
    >
      <el-table-column label="商品图片" width="120" align="center">
        <template v-slot="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.img"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="商品名字" align="center">
        <template v-slot="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="价格" width="120" align="center">
        <template v-slot="scope">
          <p>￥{{ scope.row.price }}</p>
        </template>
      </el-table-column>
      <el-table-column label="属性" width="200" align="center">
        <template v-slot="scope">
          <p>￥{{ scope.row.productAttr }}</p>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="120" align="center">
        <template v-slot="scope">
          <p>￥{{ scope.row.quantity }}</p>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog v-model="receiverDialogVisible" title="修改收货人信息" width="40%">
    <el-form :model="receiverInfo" ref="receiverInfoForm" label-width="150px">
      <el-form-item label="收货人姓名：">
        <el-input v-model="receiverInfo.receiverName" style="width: 200px" />
      </el-form-item>
      <el-form-item label="手机号码：">
        <el-input v-model="receiverInfo.receiverPhone" style="width: 200px" />
      </el-form-item>
      <el-form-item label="区域：">
        <el-input v-model="receiverInfo.receiverAddress" style="width: 200px" />
      </el-form-item>
      <!-- // receiverAddress -->
      <el-form-item label="详细地址：">
        <el-input
          v-model="receiverInfo.receiverDetailAddress"
          type="textarea"
          rows="3"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleUpdateReceiverInfo">确 定</el-button>
        <el-button type="primary" @click="receiverDialogVisible = false"
          >取 消</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { getOrderDetail, updateReceiverInfo, deleteOrder } from '@/api/getData'
import { imgBaseURL } from '@/config/url'
import { formatOrderType, formatStatus } from '@/utils/index'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  name: 'orderDetail',
  data() {
    return {
      order: {},
      imgBaseURL,
      cartList: [],
      formatOrderType,
      formatStatus,
      receiverDialogVisible: false,
      receiverInfo: {},
      logisticsDialogVisible: true
    }
  },
  inject: ['reload'],
  components: {},
  created() {
    this.getListDetail()
  },
  methods: {
    async getListDetail() {
      await getOrderDetail(this.$route.query.id).then((response) => {
        console.log(response.data)
        this.order = response.data
        response.data.cartList.map((item) => {
          const tableItem = {
            img: imgBaseURL + '/' + item.img,
            name: item.name,
            price: item.price.toFixed(2),
            quantity: item.quantity,
            productAttr: item.new_specs_0 + '：' + item.new_specs_1,
            type: item.type
          }
          this.cartList.push(tableItem)
        })
      })
    },
    showUpdateReceiverDialog() {
      this.receiverDialogVisible = true
      this.receiverInfo = {
        addressId: this.order.addressId,
        receiverName: this.order.address_name,
        receiverPhone: this.order.address_phone,
        receiverAddress: this.order.address,
        receiverDetailAddress: this.order.address_detail
      }
    },
    handleUpdateReceiverInfo() {
      ElMessageBox.alert('是否要修改收货信息?', '提示', {
        confirmButtonText: 'OK'
      })
        .then(async () => {
          await updateReceiverInfo(this.receiverInfo).then((response) => {
            if (response.data.status === 0) {
              this.receiverDialogVisible = false
              ElMessage({
                type: 'success',
                message: '修改成功!'
              })
              this.reload()
              this.getListDetail()
            }
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消修改'
          })
        })
    },
    handleDeleteOrder() {
      ElMessageBox.alert('是否要删除订单信息?', '提示', {
        confirmButtonText: 'OK'
      })
        .then(async () => {
          await deleteOrder(this.$route.query.id).then((response) => {
            if (response.data.status === 0) {
              ElMessage({
                type: 'success',
                message: '删除成功!'
              })
              this.$router.back()
            }
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消删除'
          })
        })
    },
    showLogisticsDialog() {
      this.logisticsDialogVisible = true
    },
    showMarkOrderDialog() {}
  }
}
</script>

<style lang="scss" scoped>
.operate-container {
  background: #f2f6fc;
  height: 80px;
  margin: -20px -20px 0;
  line-height: 80px;
}
.operate-button-container {
  float: right;
  margin-right: 20px;
}

.font-small {
  margin-left: 10px;
}
.table-layout {
  margin-top: 20px;
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
}
.table-cell {
  height: 60px;
  line-height: 40px;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  overflow: hidden;
}
.table-cell-title {
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  background: #f2f6fc;
  text-align: center;
  font-size: 14px;
  color: #303133;
}
.color-danger {
  color: #f56c6c;
}
</style>
