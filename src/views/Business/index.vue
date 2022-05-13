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
        <el-table-column label="商家名字" align="center">
          <template v-slot="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="商家电话" align="center">
          <template v-slot="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column label="起送价" align="center">
          <template v-slot="scope">
            ￥{{ scope.row.float_minimum_order_amount }}
          </template>
        </el-table-column>
        <el-table-column label="地址" align="center">
          <template v-slot="scope">{{ scope.row.address }} </template>
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
              @click="handleUpdateBusiness(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              @click="handleAddCommodity(scope.$index, scope.row)"
            >
              添加商品
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
import { getBusinessList, deleteBusiness } from '@/api/getData'
import { imgBaseURL } from '@/config/url'

export default {
  name: 'businessList',
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
        await getBusinessList().then((res) => {
          console.log(res)
          if (res.status === 200) {
            res.data.map((item) => {
              const tableItem = {
                _id: item._id,
                image_url: imgBaseURL + '/' + item.image_url,
                name: item.name,
                phone: item.phone,
                float_minimum_order_amount: item.float_minimum_order_amount,
                address: item.address
              }
              this.tableData.push(tableItem)
            })
          }
        })
      } catch (err) {
        console.log('获取数据失败')
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
    handleUpdateBusiness(index, row) {
      this.$router.push({ path: '/bms/updateBusiness', query: { id: row._id } })
    },
    handleDelete(index, row) {
      ElMessageBox.alert('是否要删除该医院信息?', '提示', {
        confirmButtonText: 'OK'
      })
        .then(async () => {
          await deleteBusiness(row._id).then((response) => {
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
    handleAddCommodity(index, row) {
      this.$router.push({
        path: '/bms/addCommodity',
        query: { business_id: row._id }
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
