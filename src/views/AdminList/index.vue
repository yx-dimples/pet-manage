<template>
  <div class="root">
    <el-card class="data">
      <el-icon><tickets /></el-icon>
      数据列表
    </el-card>
    <div class="table-container">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="编号" align="center">
          <template v-slot="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="创建日期" align="center">
          <template v-slot="scope">{{ scope.row.create_time }}</template>
        </el-table-column>
        <el-table-column label="账号" align="center">
          <template v-slot="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="地区" align="center">
          <template v-slot="scope">{{ scope.row.city }}</template>
        </el-table-column>
        <el-table-column label="头像" align="center">
          <template v-slot="scope">
            <img :src="scope.row.avatarUrl" width="50" height="50" />
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="10"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { adminList, adminTotal } from '@/api/getData'
import { imgBaseURL } from '@/config/url'

export default {
  name: 'userList',
  data() {
    return {
      listQuery: {
        keyword: ''
      },
      tableData: [],
      imgBaseURL,
      offset: 0,
      limit: 20,
      total: 0,
      currentPage: 1
    }
  },
  created() {
    this.initData()
  },
  methods: {
    handleResetSearch() {
      this.listQuery = this.$options.listQuery()
    },
    async initData() {
      try {
        const { data, status, message } = await adminTotal()
        if (status === 200) {
          this.count = data.data
        } else {
          throw new Error(message)
        }
      } catch (error) {
        console.log('获取数据失败', error)
      }
      this.getUser()
    },
    async getUser() {
      try {
        const { data, status, message } = await adminList({
          limit: this.limit,
          offset: this.offset
        })
        if (status === 200) {
          data.data.map((item) => {
            const tableItem = {
              _id: item._id,
              create_time: item.create_time,
              username: item.username,
              id: item.id,
              avatarUrl: this.imgBaseURL + '/' + item.avatar,
              city: item.city
            }
            this.tableData.push(tableItem)
          })
        } else {
          throw new Error(message)
        }
      } catch (error) {
        console.log('获取数据失败', error)
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getUser()
    }
  }
}
</script>

<style lang="scss" scoped>
.root {
  .data {
    margin: 20px 0;
  }
  .table-container {
    .pagination-container {
      margin-top: 20px;
    }
  }
}
</style>
