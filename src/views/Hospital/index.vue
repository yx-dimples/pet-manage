<template>
  <div class="root">
    <el-card class="data">
      <el-icon><tickets /></el-icon>
      数据列表
    </el-card>
    <div class="table-container">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="编号" align="center" width="230">
          <template v-slot="scope">{{ scope.row._id }}</template>
        </el-table-column>
        <el-table-column label="医院名字" align="center">
          <template v-slot="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="医院类型" align="center">
          <template v-slot="scope">{{ scope.row.category_name }}</template>
        </el-table-column>
        <el-table-column label="医院地址" align="center">
          <template v-slot="scope">{{ scope.row.address }}</template>
        </el-table-column>
        <el-table-column label="医院电话" align="center">
          <template v-slot="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column label="图片" align="center">
          <template v-slot="scope">
            <el-image
              style="width: 80px; height: 50px"
              :src="scope.row.image_url"
            ></el-image>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200">
          <template v-slot="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除
            </el-button>
            <el-button
              size="small"
              @click="handleUpdateHospital(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              @click="handleAddDoctor(scope.$index, scope.row)"
            >
              添加医生
            </el-button>
            <el-button
              size="small"
              @click="handleAddBeautician(scope.$index, scope.row)"
            >
              添加美容师
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
import { ElMessageBox, ElMessage } from 'element-plus'
import { hospitalList, deleteHospital } from '@/api/getData'
import { imgBaseURL } from '@/config/url'
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
    handleResetSearch() {
      this.listQuery = this.$options.listQuery()
    },
    async initData() {
      try {
        const { status, data } = await hospitalList()
        // console.log(data.hospitalList)
        if (status === 200) {
          data.map((item) => {
            // console.log()
            const tableItem = {
              _id: item._id,
              id: item.id,
              image_url: imgBaseURL + '/' + item.img_url.split('|')[0],
              name: item.name,
              category_name: item.hospitalcategory_name,
              address: item.address,
              phone: item.phone
            }
            this.tableData.push(tableItem)
          })
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
      this.getPetInfo()
    },
    // 编辑
    handleUpdateHospital(index, row) {
      this.$router.push({ path: '/hms/updateHospital', query: { id: row._id } })
    },
    handleDelete(index, row) {
      console.log(row._id)
      ElMessageBox.alert('是否要删除该医院信息?', '提示', {
        confirmButtonText: 'OK'
      })
        .then(async () => {
          await deleteHospital(row._id).then((response) => {
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
    },
    handleAddDoctor(index, row) {
      this.$router.push({
        path: '/hms/addDoctor',
        query: { hospital_id: row._id }
      })
    },
    handleAddBeautician(index, row) {
      this.$router.push({
        path: '/hms/addBeautician',
        query: { hospital_id: row._id }
      })
    }
  }
}
</script>

<style lang="scss">
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
