<template>
  <div>
    <el-card shadow="never">
      <el-icon><tickets /></el-icon>
      数据列表
    </el-card>
    <el-table
      :data="list"
      border
      ref="deliverOrderTable"
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column label="订单编号" width="180" align="center">
        <template v-slot="scope">{{ scope.row.orderSn }}</template>
      </el-table-column>
      <el-table-column label="收货人" width="180" align="center">
        <template v-slot="scope">{{ scope.row.receiverName }}</template>
      </el-table-column>
      <el-table-column label="手机号码" width="160" align="center">
        <template v-slot="scope">{{ scope.row.receiverPhone }}</template>
      </el-table-column>
      <el-table-column label="收货地址" align="center">
        <template v-slot="scope">{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column label="配送方式" width="160" align="center">
        <template v-slot="scope">
          <el-select
            placeholder="请选择物流公司"
            v-model="scope.row.deliveryCompany"
            size="small"
          >
            <el-option
              v-for="item in companyOptions"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="物流单号" width="180" align="center">
        <template v-slot="scope">
          <el-input size="small" v-model="scope.row.deliverySn"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 15px; text-align: center">
      <el-button @click="cancel">取消</el-button>
      <el-button @click="confirm" type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
import { deliveryOrder } from '@/api/getData'
import { ElMessage, ElMessageBox } from 'element-plus'

const defaultLogisticsCompanies = [
  '顺丰快递',
  '圆通快递',
  '中通快递',
  '韵达快递'
]

export default {
  name: 'deliverOrderList',
  data() {
    return {
      list: [],
      companyOptions: defaultLogisticsCompanies
    }
  },
  created() {
    for (let i = 0; i < this.$route.query.list.length; i++) {
      const element = Array(JSON.parse(this.$route.query.list[i]))
      element.filter((item) => this.list.push(item))
    }
  },
  methods: {
    cancel() {
      this.$router.back()
    },
    confirm() {
      ElMessageBox.alert('是否要删除订单信息?', '提示', {
        confirmButtonText: 'OK'
      })
        .then(async () => {
          await deliveryOrder(this.list).then((response) => {
            if (response.data.status === 0) {
              this.$router.back()
              ElMessage({
                type: 'success',
                message: '发货成功!'
              })
            }
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消发货'
          })
        })
    }
  }
}
</script>

<style></style>
