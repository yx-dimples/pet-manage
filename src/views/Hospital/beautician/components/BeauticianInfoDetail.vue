<template>
  <div class="root">
    <el-form
      :model="value"
      :rules="rules"
      ref="beauticianInfoForm"
      label-width="120px"
      style="width: 600px"
      size="small"
    >
      <el-form-item label="美容师名字：" prop="name">
        <el-input v-model="value.name" />
      </el-form-item>
      <el-form-item label="美容师职称：" prop="address">
        <el-input v-model="value.title" />
      </el-form-item>
      <el-form-item label="入职时间：">
        <el-date-picker
          v-model="value.practice"
          type="date"
          placeholder="Pick a Date"
          format="YYYY/MM/DD"
        />
        <!-- <el-input v-model="value.practice" /> -->
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext"
          >下一步，填写美容师属性</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
  name: 'beauticianInfoDetail',
  props: {
    modelValue: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  created() {},
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    handleNext() {
      this.$refs.beauticianInfoForm.validate((valid) => {
        if (valid) {
          this.$emit('nextStep')
        } else {
          ElMessage({
            message: '验证失败',
            type: 'error',
            duration: 1000
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.root {
  margin-top: 40px;
}
</style>

<style>
.el-input__icon {
  margin-top: 6px !important;
}
</style>
