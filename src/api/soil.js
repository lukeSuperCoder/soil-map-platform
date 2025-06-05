import request from './request'

// 获取土壤信息列表
export function getSoilList() {
  return request({
    url: '/soil/list',
    method: 'get'
  })
}

// 根据几何范围查询土壤信息
export function getSoilByGeometry(wkt) {
  return request({
    url: '/soil/listByGeometry',
    method: 'get',
    params: { wkt }
  })
}

// 根据条件查询土壤信息
export function getSoilByCondition(data) {
  return request({
    url: '/soil/listByCondition',
    method: 'get',
    params: {
      soilInfo: data
    }
  })
}

// 查询酸化土壤
export function getAcidifiedSoil(phValue, wkt) {
  return request({
    url: '/soil/listAcidifiedSoil',
    method: 'get',
    params: {
      phValue,
      wkt
    }
  })
}

// 获取土壤详情
export function getSoilDetail(id) {
  return request({
    url: `/soil/get/${id}`,
    method: 'get'
  })
}

// 添加土壤信息
export function addSoil(data) {
  return request({
    url: '/soil/add',
    method: 'post',
    data
  })
}

// 更新土壤信息
export function updateSoil(data) {
  return request({
    url: '/soil/update',
    method: 'put',
    data
  })
}

// 删除土壤信息
export function deleteSoil(id) {
  return request({
    url: `/soil/delete/${id}`,
    method: 'delete'
  })
}

// 统计分析
export function getSoilStatistics(wkt) {
  return request({
    url: '/soil/statistics',
    method: 'get',
    params: { wkt }
  })
} 