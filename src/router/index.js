import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '@/views/Layout'

// 路由懒加载
const Login = () => import('@/views/Login')
const Home = () => import('@/views/Home')
const UserList = () => import('@/views/UserList')
const AdminList = () => import('@/views/AdminList')
const PetList = () => import('@/views/PetList')
// 医院
const HospitalList = () => import('../views/Hospital/index.vue')
const UpdateHospital = () => import('@/views/Hospital/update.vue')
const AddHospital = () => import('@/views/Hospital/add.vue')
// 医生
const DoctorList = () => import('@/views/Hospital/doctor')
const UpdateDoctor = () => import('@/views/Hospital/doctor/update.vue')
const AddDoctor = () => import('@/views/Hospital/doctor/add.vue')
const BeauticianList = () => import('@/views/Hospital/beautician')
// 美容师
const UpdateBeautician = () => import('@/views/Hospital/beautician/update.vue')
const AddBeautician = () => import('@/views/Hospital/beautician/add.vue')
// 预约信息
const RezInfo = () => import('@/views/Hospital/rezInfo')
const UpdateRezInfo = () => import('@/views/Hospital/rezInfo/update.vue')
// 商家
const BusinessList = () => import('@/views/Business')
const AddBusiness = () => import('@/views/Business/add.vue')
const UpdateBusiness = () => import('@/views/Business/update.vue')
// 商品
const CommodityList = () => import('@/views/Business/commodity')
const AddCommodity = () => import('@/views/Business/commodity/add.vue')
const UpdateCommodity = () => import('@/views/Business/commodity/update.vue')
// 订单
const OrderList = () => import('@/views/Order')
const OrderDetail = () => import('../views/Order/orderDetail.vue')
const SetOrder = () => import('@/views/Order/set.vue')
const ReturnApply = () => import('@/views/Order/apply.vue')
const DeliverOrderList = () => import('@/views/Order/deliverOrderList.vue')
const ApplyDetail = () => import('../views/Order/applyDetail.vue')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          icon: 'home'
        },
        component: Home
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/userList',
    children: [
      {
        path: '/userList',
        name: 'userList',
        meta: {
          title: '用户列表',
          icon: 'user'
        },
        component: UserList
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/adminList',
    children: [
      {
        path: '/adminList',
        name: 'adminList',
        meta: {
          title: '管理员列表',
          icon: 'user'
        },
        component: AdminList
      }
    ]
  },
  {
    path: '/petinfo',
    component: Layout,
    redirect: '/petList',
    children: [{
      path: '/petList',
      name: 'petList',
      component: PetList,
      meta: { title: '宠物列表', icon: 'pet' }
    }]
  },
  {
    path: '/hms',
    component: Layout,
    redirect: '/hms/hospital',
    meta: { title: '医院', icon: 'hospital' },
    children: [
      {
        path: 'hospitalList',
        name: 'hospitalList',
        component: HospitalList,
        meta: { title: '医院列表', icon: 'list' }
      },
      {
        path: 'updateHospital',
        name: 'updateHospital',
        component: UpdateHospital,
        meta: { title: '修改医院' },
        hidden: true
      },
      {
        path: 'addHospital',
        name: 'addHospital',
        component: AddHospital,
        meta: { title: '添加医院', icon: 'add' }
      },
      {
        path: 'doctorList',
        name: 'doctorList',
        component: DoctorList,
        meta: { title: '医生列表', icon: 'list' }
      },
      {
        name: 'updateDoctor',
        path: 'updateDoctor',
        component: UpdateDoctor,
        meta: { title: '修改医生信息' },
        hidden: true
      },
      {
        name: 'addDoctor',
        path: 'addDoctor',
        component: AddDoctor,
        meta: { title: '添加医生', icon: 'add' }
      },
      {
        path: 'beauticianList',
        name: 'beauticianList',
        component: BeauticianList,
        meta: { title: '美容师列表', icon: 'list' }
      },
      {
        name: 'updateBeautician',
        path: 'updateBeautician',
        component: UpdateBeautician,
        meta: { title: '修改美容师信息' },
        hidden: true
      },
      {
        name: 'addBeautician',
        path: 'addBeautician',
        component: AddBeautician,
        meta: { title: '添加美容师', icon: 'add' }
      },
      {
        path: 'rezInfo',
        name: 'rezInfo',
        component: RezInfo,
        meta: { title: '预约信息', icon: 'rez-info' }
      },
      {
        path: 'updateRezInfo',
        name: 'updateRezInfo',
        component: UpdateRezInfo,
        meta: { title: '预约信息详情' },
        hidden: true
      }
    ]
  },
  {
    path: '/bms',
    component: Layout,
    redirect: '/bms/business',
    meta: { title: '商家', icon: 'business' },
    children: [
      {
        path: 'businessList',
        name: 'businessList',
        component: BusinessList,
        meta: { title: '商家列表', icon: 'list' }
      },
      {
        path: 'addBusiness',
        name: 'addBusiness',
        component: AddBusiness,
        meta: { title: '添加商家', icon: 'list' }
      },
      {
        path: 'updateBusiness',
        name: 'updateBusiness',
        component: UpdateBusiness,
        meta: { title: '修改商家' },
        hidden: true
      },
      {
        path: 'commodityList',
        name: 'commodityList',
        component: CommodityList,
        meta: { title: '商品列表', icon: 'list' }
      },
      {
        path: 'addCommodity',
        name: 'addCommodity',
        component: AddCommodity,
        meta: { title: '添加商品', icon: 'list' }
      },
      {
        path: 'updateCommodity',
        name: 'updateCommodity',
        component: UpdateCommodity,
        meta: { title: '修改商品' },
        hidden: true
      }
    ]
  },
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    meta: { title: '订单', icon: 'order' },
    children: [
      {
        path: 'orderList',
        name: 'orderList',
        component: OrderList,
        meta: { title: '订单列表', icon: 'list' }
      },
      {
        path: 'addOrder',
        name: 'addOrder',
        component: SetOrder,
        meta: { title: '订单设置', icon: 'list' }
      },
      {
        path: 'returnApply',
        name: 'returnApply',
        component: ReturnApply,
        meta: { title: '退货申请处理', icon: 'order-return' }
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: OrderDetail,
        meta: { title: '订单详情' },
        hidden: true
      },
      {
        path: 'deliverOrderList',
        name: 'deliverOrderList',
        component: DeliverOrderList,
        meta: { title: '发货列表' },
        hidden: true
      },
      {
        path: 'returnApplyDetail',
        name: 'applyDetail',
        component: ApplyDetail,
        meta: { title: '退货原因详情' },
        hidden: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
