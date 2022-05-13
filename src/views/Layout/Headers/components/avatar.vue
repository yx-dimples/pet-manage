<template>
  <el-dropdown>
    <span>
      <el-avatar :shape="squareUrl" :size="40" :src="squareUrl"></el-avatar>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { ElMessage } from 'element-plus'
import { localGet, localRemove } from '@/utils'
import { imgBaseURL } from '@/config/url'
import { signout } from '@/api/login'
export default {
  name: 'avatar',
  data() {
    return {
      squareUrl: ''
    }
  },
  created() {
    const { avatar } = localGet('adminInfo')
    this.squareUrl = imgBaseURL + '/' + avatar
  },
  methods: {
    async logout() {
      const res = await signout()
      if (res.data.status === 1) {
        localRemove('adminInfo')
        ElMessage({
          type: 'success',
          message: '退出成功'
        })
        this.$router.push('/')
      } else {
        ElMessage({
          type: 'error',
          message: res.data.message
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dropdown-menu__item {
  white-space: nowrap;
}
</style>
