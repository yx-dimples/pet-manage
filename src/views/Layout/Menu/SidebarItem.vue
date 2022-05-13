<template>
  <div>
    <div v-for="(item, index) in routes" :key="index">
      <div v-if="!item.hidden && item.children">
        <el-menu-item
          v-if="hasOneShowingChildren(item.children)"
          :index="item.children[0].path"
        >
          <template #title>
            <svg-icon :icon="item.children[0].meta.icon"></svg-icon>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
        <el-sub-menu v-else :index="item.path">
          <template #title>
            <svg-icon :icon="item.meta.icon"></svg-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item-group
            v-for="(child, index) in item.children"
            :key="index"
          >
            <template v-if="!child.hidden">
              <sidebar-item
                :is-nest="true"
                class="nest-menu"
                v-if="child.children && child.children.length > 0"
                :routes="[child]"
                :key="child.path"
              />

              <router-link
                v-else
                :to="item.path + '/' + child.path"
                :key="child.name"
              >
                <el-menu-item :index="child.path">
                  <template #title>
                    <svg-icon :icon="child.meta.icon" />
                    <span>{{ child.meta.title }}</span>
                  </template>
                </el-menu-item>
              </router-link>
            </template>
          </el-menu-item-group>
        </el-sub-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar-item',
  props: {
    routes: {
      type: Array
    }
  },
  created() {
    console.log(this.routes)
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter((item) => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    }
  }
}
</script>
