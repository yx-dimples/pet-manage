<template>
  <el-breadcrumb class="breadcrumb-container" separator="/">
    <el-breadcrumb-item v-for="item in levelList" :key="item.path">
      <span v-if="item.meta.title || item.children.meta">
        <span
          v-if="item.redirect === 'noredirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <router-link v-else :to="item.redirect || item.path">{{
          item.meta.title
        }}</router-link>
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'breadcrumb',
  data() {
    return {
      levelList: null
    }
  },
  created() {
    this.getBreadcrumb()
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.name)
      const home = matched[0]
      if (home && home.name !== 'home') {
        matched = [{ path: '/', meta: { title: '首页' } }].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb-container {
  display: inline-block;
  font-size: 14px;
  line-height: 60px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
