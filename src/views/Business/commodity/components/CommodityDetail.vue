<template>
  <div class="root">
    <el-card>
      <el-form :model="categoryForm" label-width="130px" ref="categoryForm">
        <el-form-item label="商品种类:">
          <el-select
            style="width: 100%"
            v-model="categoryForm.menuId"
            @change="handleMenuId"
          >
            <el-option
              v-for="item in categoryForm.categoryList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <div
          class="add_category_row"
          v-if="showAddCategory"
          :class="showAddCategory ? 'showEdit' : ''"
        >
          <div class="add_category">
            <el-form-item label="商品种类:">
              <el-input v-model="categoryForm.name" prop="name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitcategoryForm"
                >提交</el-button
              >
            </el-form-item>
          </div>
        </div>
        <div class="add_category_button" @click="addCategoryFun">
          <el-icon class="edit_icon" v-if="showAddCategory"
            ><caret-bottom
          /></el-icon>
          <el-icon class="edit_icon" v-else><caret-top /></el-icon>
          <span>添加商品种类</span>
        </div>
      </el-form>
    </el-card>

    <el-card class="root">
      <el-form
        :rules="rules"
        :model="businessParam"
        label-width="130px"
        ref="commodityDetailForm"
      >
        <el-form-item label="商品名称：" prop="name">
          <el-input v-model="commodityParam.name" />
        </el-form-item>
        <el-form-item label="商品售价：">
          <el-input v-model="commodityParam.price" />
        </el-form-item>
        <el-form-item label="商品月售量：">
          <el-input v-model="commodityParam.monthly_sale" />
        </el-form-item>
        <el-form-item label="商品描述：">
          <el-input v-model="commodityParam.detail" type="textarea" />
        </el-form-item>
        <el-form-item label="上传商品图片：">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/api/upload/add"
            :show-file-list="false"
            :on-success="uploadImg"
            :before-upload="beforeImgUpload"
          >
            <img
              v-if="commodityParam.image_url"
              :src="imgBaseURL + '/' + commodityParam.image_url"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品规格">
          <el-radio class="radio" v-model="foodSpecs" label="one"
            >单规格</el-radio
          >
          <el-radio class="radio" v-model="foodSpecs" label="more"
            >多规格</el-radio
          >
        </el-form-item>
        <el-form-item label="商品库存：" v-if="foodSpecs == 'one'">
          <el-input-number
            v-model="commodityParam.number"
            :min="0"
            :max="10000"
          ></el-input-number>
        </el-form-item>
        <div v-else style="overflow: auto; text-align: center">
          <el-button
            type="primary"
            @click="dialogFormVisible = true"
            style="margin-bottom: 10px"
            >添加规格</el-button
          >
          <el-table
            :data="commodityParam.specs"
            stripe
            style="margin-bottom: 20px"
          >
            <el-table-column prop="name" label="规格"> </el-table-column>
            <el-table-column prop="number" label="数量"> </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-form-item>
          <el-button type="primary" @click="finishCommit"
            >完成,提交商品</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <el-dialog v-model="dialogFormVisible" title="添加规格">
      <el-form :rules="specsFormrules" :model="specsForm">
        <el-form-item label="规格" label-width="100px" prop="specs">
          <el-input v-model="specsForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" label-width="100px">
          <el-input-number
            v-model="specsForm.number"
            :min="0"
            :max="100"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addspecs">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessageBox, ElMessage } from 'element-plus'
import {
  commodityDetails,
  getCategory,
  addCategory,
  updateCommodity,
  addCommodity
} from '@/api/getData'
import { imgBaseURL } from '@/config/url'

const defaultCommodityParam = {
  name: '',
  businessId: '',
  price: null,
  cost_price: null,
  originalPrice: null,
  number: null,
  image_url: '',
  specs: [],
  menuId: null,
  monthly_sale: null,
  detail: ''
}

export default {
  components: {},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      commodityParam: Object.assign({}, defaultCommodityParam),
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }]
      },
      imgBaseURL,
      business_id: '',
      categoryForm: {
        categoryList: [],
        menuId: null,
        name: '',
        description: ''
      },
      showAddCategory: false,
      foodSpecs: 'one',
      dialogFormVisible: false,
      specsFormrules: {
        specs: [{ required: true, message: '请输入规格', trigger: 'blur' }]
      },
      specsForm: {
        name: '',
        number: 20
      }
    }
  },
  computed: {},
  created() {
    if (this.isEdit) {
      commodityDetails(this.$route.query.id).then((res) => {
        this.commodityParam = res.data
        console.log(res.data)
        this.business_id = this.commodityParam.businessId
        this.categoryForm.menuId = this.commodityParam.menuId
        if (this.commodityParam.cost_price === 0) {
          this.commodityParam.originalPrice = ''
        } else {
          this.commodityParam.originalPrice = this.commodityParam.cost_price
        }
        if (
          this.commodityParam.specs &&
          this.commodityParam.specs.length !== 0
        ) {
          this.foodSpecs = 'more'
        } else {
          this.foodSpecs = 'one'
        }
        this.initData()
      })
    } else {
      if (this.$route.query.business_id) {
        this.business_id = this.$route.query.business_id
        this.initData()
      } else {
        ElMessageBox.alert(
          '添加商品需要选择一个商家，先去就去选择商家吗？',
          '提示',
          {
            confirmButtonText: 'OK'
          }
        )
          .then(() => {
            this.$router.push('/bms/businessList')
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '取消'
            })
          })
      }
    }
  },
  methods: {
    async initData() {
      const res = await getCategory(this.business_id)
      if (res.status === 200) {
        res.data.map((item, index) => {
          item.value = item.id
          item.label = item.name
        })
        this.categoryForm.categoryList = res.data
      }
    },
    async submitcategoryForm() {
      const params = {
        name: this.categoryForm.name,
        business_id: this.business_id
      }
      const result = await addCategory(params)
      if (result.data.status === 0) {
        this.initData()
        this.showAddCategory = false
        ElMessage({
          type: 'success',
          message: '添加成功',
          duration: 1000
        })
      } else {
        ElMessage.error('请检查输入是否正确')
      }
    },
    addCategoryFun() {
      this.showAddCategory = !this.showAddCategory
    },
    handleMenuId(val) {
      this.commodityParam.menuId = val
    },
    uploadImg(res, file) {
      // console.log(res)
      if (res.status === 1) {
        this.commodityParam.image_url = res.image_path
      } else {
        ElMessage({
          message: '上传图片失败！',
          type: 'error',
          duration: 1000
        })
      }
    },
    beforeImgUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        ElMessage({
          message: '上传头像图片大小不能超过 2MB!',
          type: 'error',
          duration: 1000
        })
      }
      return isLt2M
    },
    handleDelete(index) {
      this.commodityParam.specs.splice(index, 1)
    },
    addspecs() {
      this.commodityParam.specs.push({ ...this.specsForm })
      this.dialogFormVisible = false
    },
    // 完成
    finishCommit() {
      ElMessageBox.alert('是否要提交该商品?', '提示', {
        confirmButtonText: 'OK'
      })
        .then(() => {
          if (this.isEdit) {
            updateCommodity(this.$route.query.id, this.commodityParam).then(
              (response) => {
                console.log(response.data.status === 0)
                if (response.data.status === 0) {
                  ElMessage({
                    type: 'success',
                    message: '提交成功',
                    duration: 1000
                  })
                  this.$router.back()
                }
              }
            )
          } else {
            const data = {
              commodityParam: this.commodityParam,
              business_id: this.business_id
            }
            // 柠檬猫砂除臭结团猫沙膨润土低尘猫砂20斤10kg猫咪用品
            addCommodity(data).then((response) => {
              if (response.data.status === 0) {
                ElMessage({
                  type: 'success',
                  message: '提交成功',
                  duration: 1000
                })
                this.$router.back()
              }
            })
          }
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消'
          })
        })
    }
  }
}
</script>

<style lang="scss">
.showEdit {
  height: 145px;
}
.add_category {
  background: #f9fafc;
  padding: 10px 30px 0px 10px;
  border: 1px solid #eaeefb;
  border-top: none;
}
.add_category_button {
  line-height: 40px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border: 1px solid #eaeefb;
  border-top: none;
  transition: all 400ms;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 14px;
    transition: all 400ms;
  }
  .edit_icon {
    color: #ccc;
    transition: all 400ms;
  }
}
.add_category_button:hover {
  background: #f9fafc;
  span,
  .edit_icon {
    color: #20a0ff;
  }
}
</style>
