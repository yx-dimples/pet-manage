<template>
  <div class="navbar">
    <!-- 面包屑导航 -->
    <breadcrumb />
    <div class="navbar-right">
      <!-- 全部 -->
      <screen-full class="navbar-item" />
      <!-- 头像 -->
      <avatar class="navbar-item" />
    </div>
  </div>
</template>

<script>
import breadcrumb from './components/breadcrumb.vue'
import avatar from './components/avatar.vue'
import screenFull from './components/screenFull.vue'
export default {
  name: 'headers',
  components: {
    breadcrumb,
    avatar,
    screenFull
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 16px;
  display: flex;
  align-content: center;
  box-sizing: border-box;
  position: relative;
  .navbar-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ::v-deep .navbar-item {
      display: inline-block;
      margin-left: 18px;
      font-size: 16px;
      color: #5a5e66;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
}
</style>
