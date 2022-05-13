<template>
  <scroll-bar>
    <el-menu
      active-text-color="#ffd04b"
      :background-color="variables.menuBg"
      :default-active="defaultActive"
      text-color="#fff"
      unique-opened
      :show-timeout="200"
      :collapse="!$store.getters.siderType"
      router
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import variables from '@/assets/styles/variables.scss'
import ScrollBar from '@/components/ScrollBar'
import SidebarItem from './SidebarItem'
export default {
  name: 'menu',
  components: {
    ScrollBar,
    SidebarItem
  },
  data() {
    return {
      variables
    }
  },
  computed: {
    defaultActive() {
      return this.$route.path.replace('/', '')
    },
    routes() {
      return this.$router.options.routes
    }
  }
}
</script>

<style lang="scss" scoped></style>
