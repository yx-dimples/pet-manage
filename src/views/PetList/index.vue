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
        <el-table-column label="昵称" align="center">
          <template v-slot="scope">{{ scope.row.nickname }}</template>
        </el-table-column>
        <el-table-column label="创建日期" align="center">
          <template v-slot="scope">{{ scope.row.create_time }}</template>
        </el-table-column>
        <el-table-column label="头像" align="center">
          <template v-slot="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.avatar"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="年龄" align="center">
          <template v-slot="scope">{{ scope.row.birthday }}</template>
        </el-table-column>
        <el-table-column label="体重" align="center">
          <template v-slot="scope">{{ scope.row.weight }}kg</template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template v-slot="scope">{{ scope.row.sex }}</template>
        </el-table-column>
        <el-table-column label="是否绝育" align="center">
          <template v-slot="scope">{{ scope.row.iskc }}</template>
        </el-table-column>
        <el-table-column label="宠物类型" align="center">
          <template v-slot="scope">{{ scope.row.type }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template v-slot="scope">
            <el-button size="small" @click="handleSee(scope.$index, scope.row)">
              查看
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
    <el-dialog
      v-model="dialogVisible"
      title="宠物详情"
      :before-close="handleClose"
    >
      <el-descriptions :column="1" :size="size" border>
        <el-descriptions-item label="宠物昵称">{{
          petInfo.nickname
        }}</el-descriptions-item>
        <el-descriptions-item label="宠物类型">{{
          petInfo.type
        }}</el-descriptions-item>
        <el-descriptions-item label="出生日期">
          {{ petInfo.birthday }}
        </el-descriptions-item>
        <el-descriptions-item label="体重">
          {{ petInfo.weight }}
        </el-descriptions-item>
        <el-descriptions-item label="性别">
          {{ sex(petInfo.sex) }}
        </el-descriptions-item>
        <el-descriptions-item label="是否绝育">
          {{ isKC(petInfo.iskc) }}
        </el-descriptions-item>
      </el-descriptions>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { petList, petTotal, petInfo } from '@/api/getData'
import { imgBaseURL } from '@/config/url'
import { jsGetAge, isKC, sex } from '@/utils/index'

export default {
  name: 'userList',
  inject: ['reload'],
  data() {
    return {
      tableData: [],
      petInfo: [],
      offset: 0,
      limit: 20,
      total: 0,
      currentPage: 1,
      dialogVisible: false,
      sex,
      isKC
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
        const { data, status, message } = await petTotal()
        if (status === 200) {
          this.count = data
        } else {
          throw new Error(message)
        }
      } catch (error) {
        console.log('获取数据失败', error)
      }
      this.getPetInfo()
    },
    async getPetInfo() {
      try {
        const { data, status } = await petList({
          limit: this.limit,
          offset: this.offset
        })
        if (status === 200) {
          data.map((item) => {
            const tableItem = {
              id: item._id,
              avatar: imgBaseURL + '/' + item.avatar,
              nickname: item.nickname,
              birthday: jsGetAge(item.birthday),
              weight: item.weight,
              create_time: item.create_time,
              type: item.type,
              iskc: isKC(item.iskc),
              sex: sex(item.sex)
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
    async handleSee(index, row) {
      const res = await petInfo(row.id)
      if (res.status === 200) {
        // console.log(res.data)
        this.petInfo = res.data
        this.dialogVisible = true
      }
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
