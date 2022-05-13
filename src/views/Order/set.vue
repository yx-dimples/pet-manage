<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="orderSetting" ref="orderSettingForm" :rules="rules">
      <el-form-item label="秒杀订单超过：">
        <el-input class="input-width">
          <template #append>分</template>
        </el-input>
        <span class="note-margin">未付款，订单自动关闭</span>
      </el-form-item>
      <el-form-item label="正常订单超过：" prop="normalOrderOvertime">
        <el-input class="input-width">
          <template #append>分</template>
        </el-input>
        <span class="note-margin">未付款，订单自动关闭</span>
      </el-form-item>
      <el-form-item label="发货超过：  " prop="confirmOvertime">
        <el-input class="input-width">
          <template #append>分</template>
        </el-input>
        <span class="note-margin">未付款，订单自动关闭</span>
      </el-form-item>
      <el-form-item label="订单完成超过：" prop="finishOvertime">
        <el-input class="input-width">
          <template #append>天</template>
        </el-input>
        <span class="note-margin">自动结束交易，不能申请售后</span>
      </el-form-item>
      <el-form-item label="订单完成超过：" prop="commentOvertime">
        <el-input class="input-width">
          <template #append>天</template>
        </el-input>
        <span class="note-margin">自动五星好评</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getOrderSetting } from '@/api/getData'

const defaultOrderSetting = {
  commentOvertime: 0,
  confirmOvertime: 0,
  finishOvertime: 0,
  flashOrderOvertime: 0,
  normalOrderOvertime: 0
}

const checkTime = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('时间不能为空'))
  }
  console.log('checkTime', value)
  const intValue = parseInt(value)
  if (!Number.isInteger(intValue)) {
    return callback(new Error('请输入数字值'))
  }
  callback()
}
export default {
  name: 'addBusiness',
  orderSetting: Object.assign({}, defaultOrderSetting),
  rules: {
    flashOrderOvertime: { validator: checkTime, trigger: 'blur' },
    normalOrderOvertime: { validator: checkTime, trigger: 'blur' },
    confirmOvertime: { validator: checkTime, trigger: 'blur' },
    finishOvertime: { validator: checkTime, trigger: 'blur' },
    commentOvertime: { validator: checkTime, trigger: 'blur' }
  },
  created() {
    getOrderSetting().then((res) => {
      // 获取响应数据
      res.data.map((item) => {
        const orderSettringItem = {
          commentOvertime: item.commentOvertime,
          confirmOvertime: item.confirmOvertime,
          finishOvertime: item.finishOvertime,
          flashOrderOvertime: item.flashOrderOvertime,
          normalOrderOvertime: item.normalOrderOvertime
        }
        console.log(orderSettringItem)
        this.orderSetting = Object.assign({}, orderSettringItem)
      })
    })
    // getOrderSetting().then((response) => {
    //   // console.log(Object(response.data))
    //   res.data.map((item) => {
    //     const orderSettringItem = {
    //       commentOvertime: item.commentOvertime,
    //       confirmOvertime: item.confirmOvertime,
    //       finishOvertime: item.finishOvertime,
    //       flashOrderOvertime: item.flashOrderOvertime,
    //       normalOrderOvertime: item.normalOrderOvertime
    //     }
    //     console.log(orderSettringItem)
    //     this.orderSetting = Object.assign({}, orderSettringItem)
    //   })
    // })
  },
  methods: {
    // confirm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       this.$confirm('是否要提交修改?', '提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //       }).then(() => {
    //         updateOrderSetting(1, this.orderSetting).then((response) => {
    //           this.$message({
    //             type: 'success',
    //             message: '提交成功!',
    //             duration: 1000
    //           })
    //         })
    //       })
    //     } else {
    //       this.$message({
    //         message: '提交参数不合法',
    //         type: 'warning'
    //       })
    //       return false
    //     }
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.input-width {
  width: 50%;
}
.note-margin {
  margin-left: 15px;
}
</style>
