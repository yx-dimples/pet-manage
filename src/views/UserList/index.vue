<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-icon><tickets /></el-icon>
      数据列表
    </el-card>
    <div class="table-container">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="编号" align="center">
          <template v-slot="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="日期" align="center">
          <template v-slot="scope">{{ scope.row.create_time }}</template>
        </el-table-column>
        <el-table-column label="名字" align="center">
          <template v-slot="scope">{{ scope.row.nickname }}</template>
        </el-table-column>
        <el-table-column label="地区" align="center">
          <template v-slot="scope">{{ scope.row.city }}</template>
        </el-table-column>
        <el-table-column label="头像" align="center">
          <template v-slot="scope">
            <img :src="scope.row.avatarUrl" width="50" height="50" />
          </template>
        </el-table-column>
        <el-table-column label="生日" align="center">
          <template v-slot="scope">{{ scope.row.birthday }}</template>
        </el-table-column>
        <el-table-column label="初次养宠时间" align="center">
          <template v-slot="scope">{{ scope.row.firstPetTime }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template v-slot="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="20"
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
import { ElMessageBox, ElMessage } from 'element-plus'
import { userList, userTotal, deleteUser } from '@/api/getData'
export default {
  name: 'userList',
  inject: ['reload'],
  data() {
    return {
      tableData: [],
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
    async initData() {
      try {
        const { data, status, message } = await userTotal()
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
        const { data, status, message } = await userList({
          limit: this.limit,
          offset: this.offset
        })
        if (status === 200) {
          data.data.map((item) => {
            const tableItem = {
              create_time: item.create_time,
              nickname: item.nickName,
              id: item._id,
              avatarUrl: item.avatarUrl,
              city: item.province,
              birthday: item.birthday,
              firstPetTime: item.firstPetTime
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
    handleDelete(index, row) {
      ElMessageBox.alert('是否要删除该用户?', '提示', {
        confirmButtonText: 'OK'
        // cancelButtonText: 'Cancel'
      })
        .then(() => {
          deleteUser(row.id).then((response) => {
            ElMessage({
              type: 'success',
              message: response.data.success
            })
            this.reload()
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消删除'
          })
        })
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
.app-container {
  .table-container,
  .pagination-container {
    margin-top: 20px;
  }
}
</style>
