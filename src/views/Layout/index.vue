<template>
  <el-container class="app-wrapper">
    <el-aside :width="asideWidth" class="sidebar-container">
      <v-menu></v-menu>
    </el-aside>
    <el-container
      class="container"
      :class="{ hidderContainer: !this.$store.getters.siderType }"
    >
      <el-header>
        <Headers />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from './Menu'
import Headers from './Headers'
import variables from '@/assets/styles/variables.scss'
export default {
  name: 'layout',
  data() {
    return {
      // asideWidth: ref(variables.sideBarWidth)
    }
  },
  components: {
    'v-menu': Menu,
    Headers
  },
  computed: {
    asideWidth() {
      return this.$store.getters.siderType
        ? variables.sideBarWidth
        : variables.hideSideBarWidth
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.container {
  width: calc(100% - $sideBarWidth);
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;
  &.hidderContainer {
    width: calc(100% - $hideSideBarWidth);
  }
}
::v-deep .el-header {
  padding: 0;
}
</style>
