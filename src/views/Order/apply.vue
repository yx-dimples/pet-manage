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
          label-position="right"
        >
          <el-form-item label="输入搜索：">
            <el-input
              v-model="listQuery.orderSn"
              class="input-width"
              placeholder="订单编号"
            ></el-input>
          </el-form-item>
          <el-form-item label="处理状态：">
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
          <el-form-item label="申请时间：">
            <el-date-picker
              class="input_width"
              v-model="listQuery.handleTime"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="请选择时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="操作人员：">
            <el-input
              v-model="listQuery.handleMan"
              class="input-width"
              placeholder="全部"
            />
          </el-form-item>
          <el-form-item label="处理时间：">
            <el-date-picker
              class="input_width"
              v-model="listQuery.applyTime"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="请选择时间"
            >
            </el-date-picker>
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
      >
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
        <el-table-column label="申请时间" align="center">
          <template v-slot="scope">{{ scope.row.applyTime }}</template>
        </el-table-column>
        <el-table-column label="用户账号" align="center">
          <template v-slot="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="退款金额" align="center">
          <template v-slot="scope">￥{{ scope.row.refund_amount }}</template>
        </el-table-column>
        <el-table-column label="处理时间" align="center">
          <template v-slot="scope">{{ scope.row.handleTime }}</template>
        </el-table-column>
        <el-table-column label="订单状态" align="center">
          <template v-slot="scope">{{ formStatus(scope.row.status) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template v-slot="scope">
            <el-button
              size="small"
              @click="handleViewOrder(scope.$index, scope.row)"
              >查看订单</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
</template>

<script>
import { returnApply } from '@/api/getData'
import { formStatus } from '@/utils/index'

const defaultListQuery = {
  currentPage: 1,
  pageSize: 10,
  orderSn: null,
  status: null,
  orderType: null,
  applyTime: null,
  handleTime: null,
  handleMan: null
}
const defaultStatusOptions = [
  {
    label: '待处理',
    value: 5
  },
  {
    label: '退货中',
    value: 6
  },
  {
    label: '已完成',
    value: 7
  },
  {
    label: '已拒绝',
    value: 8
  }
]
export default {
  name: 'apply',
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      formStatus,
      statusOptions: Object.assign({}, defaultStatusOptions),
      total: 0
    }
  },
  computed: {},
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
      await returnApply(this.listQuery).then((response) => {
        this.list = response.data.returnApply
        console.log(this.list)
        this.total = response.data.count
      })
    },
    handleViewOrder(index, row) {
      this.$router.push({
        path: '/oms/returnApplyDetail',
        query: { id: row._id }
      })
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
  width: 223px;
}
.pagination-container {
  margin-top: 20px;
  white-space: nowrap;
  color: #303133;
  font-weight: 700;
}
</style>
