<template>
  <div class="app-container">
    <el-card shadow="never">
      <el-icon><search /></el-icon>
      筛选搜索
      <el-button
        style="float: right"
        type="primary"
        @click="handleSearchList"
        size="small"
      >
        查询搜索
      </el-button>
      <el-button
        style="float: right; margin-right: 15px"
        @click="handleResetSearch"
        size="small"
      >
        重置
      </el-button>

      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item label="输入搜索：">
            <el-input
              v-model="listQuery.orderSn"
              class="input-width"
              placeholder="订单编号"
            ></el-input>
          </el-form-item>
          <el-form-item label="收货人：">
            <el-input
              v-model="listQuery.receiverKeyword"
              class="input-width"
              placeholder="收货人姓名/手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="提交时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.createTime"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="请选择时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单状态：">
            <el-select
              v-model="listQuery.status"
              class="input-width"
              placeholder="全部"
              clearable
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单分类：">
            <el-select
              v-model="listQuery.orderType"
              class="input-width"
              placeholder="全部"
              clearable
            >
              <el-option
                v-for="item in orderTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card shadow="never" style="margin-top: 20px">
      <el-icon><tickets /></el-icon>
      数据列表
    </el-card>

    <div class="table-container" style="margin-top: 15px">
      <el-table
        ref="orderTable"
        size="small"
        border
        :data="list"
        style="width: 100%"
        table-layout="auto"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column label="编号" width="80" align="center">
          <template v-slot="scope">
            {{
              scope.$index +
              1 +
              (listQuery.currentPage - 1) * listQuery.pageSize
            }}
          </template>
        </el-table-column>
        <el-table-column label="订单编号" align="center">
          <template v-slot="scope">{{ scope.row.order_id }}</template>
        </el-table-column>
        <el-table-column label="提交时间" align="center">
          <template v-slot="scope">{{ scope.row.create_time }}</template>
        </el-table-column>
        <el-table-column label="收货人姓名" align="center">
          <template v-slot="scope">{{ scope.row.address_name }}</template>
        </el-table-column>
        <el-table-column label="订单金额" align="center">
          <template v-slot="scope"
            >￥{{ scope.row.pay_amount.toFixed(2) }}</template
          >
        </el-table-column>
        <el-table-column label="支付方式" align="center">
          <template v-slot="scope">{{ scope.row.payment_method }}</template>
        </el-table-column>
        <el-table-column label="订单状态" align="center">
          <template v-slot="scope">{{
            formatStatus(scope.row.status)
          }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template v-slot="scope">
            <el-button
              size="small"
              @click="handleViewOrder(scope.$index, scope.row)"
              >查看订单</el-button
            >
            <el-button
              size="small"
              @click="handleCloseOrder(scope.$index, scope.row)"
              v-show="scope.row.status === 1"
              >关闭订单</el-button
            >
            <el-button
              size="small"
              @click="handleDeliveryOrder(scope.$index, scope.row)"
              v-show="scope.row.status === 4"
              >订单发货</el-button
            >
            <el-button
              size="small"
              @click="handleViewLogistics(scope.$index, scope.row)"
              v-show="scope.row.status === 2 || scope.row.status === 3"
              >订单跟踪</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDeleteOrder(scope.$index, scope.row)"
              v-show="scope.row.status === 0"
              >删除订单</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="footer">
      <div class="batch-operate-container">
        <el-select size="small" v-model="operateType" placeholder="批量操作">
          <el-option
            v-for="item in operateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button
          style="margin-left: 20px"
          class="search-button"
          @click="handleBatchOperate()"
          type="primary"
          size="small"
        >
          确定
        </el-button>
      </div>
      <div class="pagination-container">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes,prev, pager, next,jumper"
          v-model:currentPage="listQuery.currentPage"
          :page-size="listQuery.pageSize"
          :page-sizes="[5, 10, 15]"
          small
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderList, deleteOrder, closeOrder } from '@/api/getData'
import { formatStatus } from '@/utils/index'
import { ElMessage, ElMessageBox } from 'element-plus'

const defaultListQuery = {
  currentPage: 1,
  pageSize: 10,
  orderSn: null,
  receiverKeyword: null,
  status: null,
  orderType: null,
  createTime: null
}
export default {
  name: 'orderList',
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      multipleSelection: [],
      formatStatus,
      statusOptions: [
        {
          label: '已取消',
          value: 0
        },
        {
          label: '待付款',
          value: 1
        },
        {
          label: '已发货',
          value: 2
        },
        {
          label: '已完成',
          value: 3
        },
        {
          label: '待发货',
          value: 4
        }
      ],
      total: 0,
      orderTypeOptions: [
        {
          label: '商城订单',
          value: 0
        },
        {
          label: '1小时达订单',
          value: 1
        }
      ],
      operateType: null,
      operateOptions: [
        {
          label: '批量发货',
          value: 1
        }
      ]
    }
  },
  inject: ['reload'],
  computed() {},
  created() {
    this.getList()
  },
  methods: {
    handleSearchList() {
      this.listQuery.currentPage = 1
      this.getList()
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery)
    },
    async getList() {
      await getOrderList(this.listQuery).then((response) => {
        this.list = response.data.orderList
        // console.log(response)
        this.total = response.data.count
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleViewOrder(index, row) {
      this.$router.push({ path: '/oms/orderDetail', query: { id: row._id } })
    },
    handleDeleteOrder(index, row) {
      console.log(row)
      ElMessageBox.alert('是否要删除订单信息?', '提示', {
        confirmButtonText: 'OK'
      })
        .then(async () => {
          await deleteOrder(row._id).then((response) => {
            if (response.data.status === 0) {
              ElMessage({
                type: 'success',
                message: '删除成功!'
              })
              this.reload()
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
    handleCloseOrder(index, row) {
      ElMessageBox.alert('是否要关闭订单?', '提示', {
        confirmButtonText: 'OK'
      })
        .then(async () => {
          await closeOrder(row._id).then((response) => {
            if (response.data.status === 0) {
              ElMessage({
                type: 'success',
                message: '关闭成功!'
              })
              this.reload()
            }
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消关闭'
          })
        })
    },
    handleDeliveryOrder(index, row) {
      const listItem = this.covertOrder(row)
      this.$router.push({
        path: '/oms/deliverOrderList',
        query: { list: [listItem] }
      })
    },
    covertOrder(order) {
      const address = order.address + order.address_detail

      const listItem = JSON.stringify({
        orderId: order.id,
        orderSn: order.order_id,
        receiverName: order.address_name,
        receiverPhone: order.address_phone,
        address,
        deliveryCompany: null,
        deliverySn: null
      })
      return listItem
    },
    handleBatchOperate() {
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        ElMessage({
          message: '请选择要操作的订单',
          type: 'warning',
          duration: 1000
        })
      }
      if (this.operateType === 1) {
        // 批量发货
        const list = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          console.log(this.multipleSelection[i].status)
          if (this.multipleSelection[i].status === 4) {
            list.push(this.covertOrder(this.multipleSelection[i]))
          }
          if (list.length === 0) {
            ElMessage({
              message: '选中订单中没有可以发货的订单',
              type: 'warning',
              duration: 1000
            })
            return
          }
          this.$router.push({
            path: '/oms/deliverOrderList',
            query: { list: list }
          })
        }
      }
    },
    handleSizeChange(val) {
      this.listQuery.currentPage = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val
      this.getList()
    }
  }
}
</script>

<style scoped>
.input-width {
  width: 203px;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 100px;
}
.batch-operate-container {
  display: inline-block;
  margin-top: 20px;
}
.pagination-container {
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
}
</style>
