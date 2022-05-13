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
        <el-table-column label="宠物名称" align="center">
          <template v-slot="scope">{{ scope.row.pet_name }}</template>
        </el-table-column>
        <el-table-column label="预约项目" align="center">
          <template v-slot="scope">{{ scope.row.project_label }}</template>
        </el-table-column>
        <el-table-column label="预约时间" align="center">
          <template v-slot="scope">{{ scope.row.data_time }}</template>
        </el-table-column>
        <el-table-column label="预约医生" align="center">
          <template v-slot="scope">{{ scope.row.doctor_name }}</template>
        </el-table-column>
        <el-table-column label="预约医院" align="center">
          <template v-slot="scope">{{ scope.row.hospital_name }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template v-slot="scope">
            <el-button
              size="small"
              @click="handleDelete(scope.$index, scope.row)"
              >删除
            </el-button>
            <el-button
              size="small"
              @click="handleUpdateRezInfo(scope.$index, scope.row)"
            >
              查看详情
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
import { rezList, deleteRezItem } from '@/api/getData'
import { ElMessageBox, ElMessage } from 'element-plus'
export default {
  name: 'rezInfo',
  inject: ['reload'],
  data() {
    return {
      listQuery: {
        keyword: ''
      },
      tableData: [],
      offset: 0,
      limit: 20,
      total: 0,
      currentPage: 1
    }
  },
  created() {
    this.getRezList()
  },
  methods: {
    async getRezList() {
      try {
        const res = await rezList()
        if (res.status === 200) {
          res.data.map((item) => {
            const tableItem = {
              id: item._id,
              hospital_name: item.hospital_name,
              pet_name: item.pet_name,
              project_label: item.project_label,
              data_time: item.date + ' ' + item.hour,
              doctor_name: item.doctor_name
            }
            this.tableData.push(tableItem)
          })
        }
      } catch (err) {
        console.log('获取数据失败')
      }
    },
    handleUpdateRezInfo(index, row) {
      this.$router.push({ path: '/hms/updateRezInfo', query: { id: row.id } })
    },
    handleDelete(index, row) {
      ElMessageBox.alert('是否要删除该预约信息?', '提示', {
        confirmButtonText: 'OK'
      })
        .then(async () => {
          const res = await deleteRezItem(row.id)
          console.log(res)
          if (res.data.status === 0) {
            ElMessage({
              type: 'success',
              message: '删除成功'
            })
            this.reload()
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
