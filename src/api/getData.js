import request from './request'

// 用户列表
export const userList = data => {
  return request({
    url: '/user/all',
    data,
    method: 'GET'
  })
}

// 用户数量
export const userTotal = () => {
  return request({
    url: '/user/total',
    method: 'GET'
  })
}

// 删除用户
export const deleteUser = id => {
  return request({
    url: '/user/deleteUser/' + id,
    method: 'DELETE'
  })
}

// 管理员列表
export const adminList = data => {
  return request({
    url: '/admin/all',
    data,
    method: 'GET'
  })
}

// 管理员数量
export const adminTotal = () => {
  return request({
    url: '/admin/total',
    method: 'GET'
  })
}

// 全部宠物列表
export const petList = data => {
  return request({
    url: '/pet/allPetInfo',
    data,
    method: 'GET'
  })
}

// 宠物详情
export const petInfo = id => {
  return request({
    url: '/pet/petinfo/' + id,
    method: 'GET'
  })
}

// 删除宠物
export const deletePet = id => {
  return request({
    url: '/pet/deletePetInfo/' + id,
    method: 'DELETE'
  })
}

// 宠物数量
export const petTotal = () => {
  return request({
    url: '/pet/total',
    method: 'GET'
  })
}

// 全部商品分类
export function fetchListWithChildren() {
  return request({
    url: '/product/productCategory/list/withChildren',
    method: 'get'
  })
}

// 商品列表
export const productList = () => {
  return request({
    url: '/product/list',
    method: 'get'
  })
}

// 商品详情
export const productDetail = (id) => {
  return request({
    url: '/product/detail/' + id,
    method: 'GET'
  })
}

// 医院列表
export const hospitalList = () => {
  return request({
    url: '/hospital',
    method: 'GET'
  })
}

// 医院详情
export const hospitalDetail = id => {
  return request({
    url: '/hospital/hospitalDetail/' + id,
    method: 'GET'
  })
}

// 医院条件
export const condition = () => {
  return request({
    url: '/hospital/condition',
    method: 'GET'
  })
}

// 更新医院
export const updateHospital = (id, data) => {
  return request({
    url: '/hospital/update/' + id,
    method: 'POST',
    data
  })
}

// 添加医院
export const addHospital = (data) => {
  return request({
    url: '/hospital/add',
    method: 'POST',
    data
  })
}

// 删除医院
export const deleteHospital = id => {
  return request({
    url: '/hospital/delete/' + id,
    method: 'DELETE'
  })
}

// 医生列表
export const doctorList = () => {
  return request({
    url: '/hospital/doctor',
    method: 'GET'
  })
}

// 医生详情
export const doctorDetail = id => {
  return request({
    url: '/hospital/doctorDetail/' + id,
    method: 'GET'
  })
}

// 医生类型
export const doctorCategory = () => {
  return request({
    url: '/hospital/doctor/category',
    method: 'GET'
  })
}

// 修改医生
export const updateDoctor = (id, data) => {
  return request({
    url: '/hospital/update/doctor/' + id,
    method: 'POST',
    data
  })
}

// 添加医生
export const createDoctor = data => {
  return request({
    url: '/hospital/create/doctor',
    method: 'POST',
    data
  })
}

// 删除医生
export const deleteDoctor = id => {
  return request({
    url: '/hospital/delete/doctor/' + id,
    method: 'DELETE'
  })
}

// 获取美容师
export const beauticianList = () => {
  return request({
    url: '/hospital/beautician',
    method: 'GET'
  })
}
// 美容师详情
export const beauticianDetail = id => {
  return request({
    url: '/hospital/beauticianDetail/' + id,
    method: 'GET'
  })
}
// 修改美容师
export const updateBeautician = (id, data) => {
  return request({
    url: '/hospital/update/beautician/' + id,
    method: 'POST',
    data
  })
}
// 添加美容师
export const createBeautician = data => {
  return request({
    url: '/hospital/create/beautician',
    method: 'POST',
    data
  })
}
// 删除美容师
export const deleteBeautician = id => {
  return request({
    url: '/hospital/delete/beautician/' + id,
    method: 'DELETE'
  })
}
// 预约信息列表
export const rezList = () => {
  return request({
    url: '/v1/rez/list',
    method: 'GET'
  })
}

// 删除预约信息
export const deleteRezItem = id => {
  return request({
    url: '/v1/rez/item/' + id,
    method: 'DELETE'
  })
}

// 预约信息详情
export const rezDetail = id => {
  return request({
    url: '/v1/rezDetail/' + id,
    method: 'GET'
  })
}

// 修改预约信息详情
export const rezItem = id => {
  return request({
    url: `/v1/resz/${id}/item`,
    method: 'POST'
  })
}

// 商家列表
export const getBusinessList = () => {
  return request({
    url: '/business/list',
    method: 'GET'
  })
}

// 商家详情
export const businessDetail = id => {
  return request({
    url: '/business/detail/' + id,
    method: 'GET'
  })
}

// 获取定位城市
export const cityGuess = () => {
  return request({
    url: '/city/all?type=guess',
    method: 'GET'
  })
}

// 获取搜索地址
export const searchplace = (params) => {
  return request({
    url: '/search/address',
    method: 'GET',
    params: params
  })
}
// 更新商家
export const updateBusiness = (id, data) => {
  return request({
    url: '/business/update/' + id,
    method: 'POST',
    data: data
  })
}
// 添加商家
export const addBusiness = (data) => {
  return request({
    url: '/business/add',
    method: 'POST',
    data: data
  })
}
// 删除商家
export const deleteBusiness = id => {
  return request({
    url: '/business/delete/' + id,
    method: 'DELETE'
  })
}

// 商品列表
export const getCommodityList = params => {
  return request({
    url: '/business/commodity',
    method: 'GET',
    params: params
  })
}

// 商品详情
export const commodityDetails = id => {
  return request({
    url: '/business/commodity/' + id,
    method: 'GET'
  })
}

// 商品种类
export const getCategory = id => {
  return request({
    url: '/business/menu/' + id,
    method: 'GET'
  })
}

// 添加商品种类
export const addCategory = data => {
  return request({
    url: '/business/addMenu',
    method: 'post',
    data: data
  })
}

// 更新商品
export const updateCommodity = (id, data) => {
  return request({
    url: '/business/update/commodity/' + id,
    method: 'POST',
    data: data
  })
}

// 添加商品
export const addCommodity = (data) => {
  return request({
    url: '/business/add/commodity',
    method: 'POST',
    data: data
  })
}

// 删除商品
export const deleteCommodity = id => {
  return request({
    url: '/business/delete/commodity/' + id,
    method: 'DELETE'
  })
}

// 订单设置
export const getOrderSetting = () => {
  return request({
    url: '/order/orderSetting',
    method: 'get'
  })
}

// 订单列表
export const getOrderList = (params) => {
  return request({
    url: '/order/list',
    method: 'get',
    params
  })
}

// 订单详情
export const getOrderDetail = id => {
  return request({
    url: '/order/detail/' + id,
    method: 'get'
  })
}

// 修改收货人地址
export const updateReceiverInfo = data => {
  return request({
    url: '/order/receiverInfo/update',
    method: 'POST',
    data
  })
}

// 删除订单
export const deleteOrder = id => {
  return request({
    url: '/order/delete/' + id,
    method: 'DELETE'
  })
}

// 关闭订单
export const closeOrder = id => {
  return request({
    url: '/order/update/' + id,
    method: 'POST'
  })
}
// 发货
export const deliveryOrder = data => {
  return request({
    url: '/order/delivery/',
    method: 'POST',
    data
  })
}
// 退货申请
export const returnApply = params => {
  return request({
    url: '/order/apply',
    method: 'GET',
    params
  })
}

export const updateApplyStatus = (id, data) => {
  return request({
    url: '/order/update/apply/' + id,
    method: 'POST',
    data
  })
}
