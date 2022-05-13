<template>
  <div class="root">
    <el-card class="data">
      <el-icon><tickets /></el-icon>
      数据列表
    </el-card>
    <div class="table-container">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="编号" align="center" width="240">
          <template v-slot="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template v-slot="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="头像" align="center">
          <template v-slot="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.image_url"
            ></el-image>
          </template>
          <!-- <template v-slot="scope">{{ scope.row.image_url }}</template> -->
        </el-table-column>
        <el-table-column label="职称" align="center">
          <template v-slot="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column label="入职年限" align="center">
          <template v-slot="scope">{{ scope.row.practice }}</template>
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
              @click="handleUpdateDoctorInfo(scope.$index, scope.row)"
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
import { doctorList, deleteDoctor } from '@/api/getData'
import { ElMessageBox, ElMessage } from 'element-plus'
import { imgBaseURL } from '@/config/url'
import { jsGetYear } from '@/utils/index'

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
    this.getDoctorList()
  },
  methods: {
    async getDoctorList() {
      try {
        const res = await doctorList()
        if (res.status === 200) {
          res.data.map((item) => {
            console.log(item)
            const tableItem = {
              id: item._id,
              name: item.name,
              image_url: imgBaseURL + '/' + item.image_url,
              title: item.title,
              practice: jsGetYear(item.practice) + '年'
            }
            this.tableData.push(tableItem)
          })
        }
      } catch (err) {
        console.log('获取数据失败')
      }
    },
    handleUpdateDoctorInfo(index, row) {
      this.$router.push({ path: '/hms/updateDoctor', query: { id: row.id } })
    },
    handleDelete(index, row) {
      ElMessageBox.alert('是否要删除该医生信息?', '提示', {
        confirmButtonText: 'OK'
      })
        .then(async () => {
          await deleteDoctor(row.id).then((response) => {
            if (response.data.status === 0) {
              ElMessage({
                type: 'success',
                message: '删除成功'
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
