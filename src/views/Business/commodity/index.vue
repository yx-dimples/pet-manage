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
        <el-table-column label="商品图片" align="center">
          <template v-slot="scope">
            <el-image
              style="width: 80px; height: 50px"
              :src="scope.row.image_url"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="商品名字" align="center">
          <template v-slot="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="价格" align="center">
          <template v-slot="scope"> ￥{{ scope.row.price }} </template>
        </el-table-column>
        <el-table-column label="月售量" align="center">
          <template v-slot="scope">{{ scope.row.monthly_sale }} </template>
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
              @click="handleUpdateCommodity(scope.$index, scope.row)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          :currentPage="currentPage"
          :page-size="pageSize"
          small="small"
          :background="background"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessageBox, ElMessage } from 'element-plus'
import { getCommodityList, deleteCommodity } from '@/api/getData'
import { imgBaseURL } from '@/config/url'

export default {
  name: 'businessList',
  inject: ['reload'],
  data() {
    return {
      tableData: [], // 分页大小
      pageSize: 5,
      total: 0, // 总条数
      currentPage: 1, // 当前页
      offset: 0
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      try {
        await getCommodityList({}).then((res) => {
          console.log(res)
          if (res.status === 200) {
            this.total = res.data.total
          } else {
            console.log('获取数据失败')
          }
          this.getCommodityList()
        })
      } catch (err) {}
    },
    async getCommodityList() {
      try {
        await getCommodityList({
          pageNumber: this.offset,
          pageSize: this.pageSize
        }).then((res) => {
          console.log(res)
          if (res.status === 200) {
            res.data.commodityList.map((item) => {
              const tableItem = {
                _id: item._id,
                image_url: imgBaseURL + '/' + item.image_url,
                name: item.name,
                monthly_sale: item.monthly_sale,
                price: item.price
              }
              this.tableData.push(tableItem)
            })
            this.total = res.data.total
          }
        })
      } catch (err) {
        console.log('获取数据失败')
      }
    },
    // 编辑
    handleUpdateCommodity(index, row) {
      this.$router.push({
        path: '/bms/updateCommodity',
        query: { id: row._id }
      })
    },
    handleDelete(index, row) {
      ElMessageBox.alert('是否要删除该商品信息?', '提示', {
        confirmButtonText: 'OK'
      })
        .then(async () => {
          await deleteCommodity(row._id).then((response) => {
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
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage = val
      this.offset = (val - 1) * this.pageSize

      this.getCommodityList()
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
