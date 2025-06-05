import request from './request'

// 获取土壤分区列表
export function getSoilPartList() {
  return request({
    url: '/soil-part/list',
    method: 'get'
  })
}

// 根据行政区域查询
export function getSoilPartByRegion(params) {
  return request({
    url: '/soil-part/listByRegion',
    method: 'get',
    params
  })
}

// 根据pH值变化查询
export function getSoilPartByPhChange(period = '8216', changeValue) {
  return request({
    url: '/soil-part/listByPhChange',
    method: 'get',
    params: {
      period,
      changeValue
    }
  })
}

// 根据有机质含量查询
export function getSoilPartByOrganicMatter(minValue, maxValue) {
  return request({
    url: '/soil-part/listByOrganicMatter',
    method: 'get',
    params: {
      minValue,
      maxValue
    }
  })
}

// 根据空间范围查询
export function getSoilPartByGeometry(wkt) {
  return request({
    url: '/soil-part/listByGeometry',
    method: 'get',
    params: { wkt }
  })
}

// 根据条件查询
export function getSoilPartByCondition(data) {
  return request({
    url: '/soil-part/listByCondition',
    method: 'get',
    params: {
      soilPart: data
    }
  })
}

// 查询酸化土壤
export function getAcidifiedSoilPart(phValue, year = '16') {
  return request({
    url: '/soil-part/listAcidifiedSoil',
    method: 'get',
    params: {
      phValue,
      year
    }
  })
}

// 获取土壤分区详情
export function getSoilPartDetail(id) {
  return request({
    url: `/soil-part/get/${id}`,
    method: 'get'
  })
}

// 区域pH值统计
export function getPhStatisticsByRegion(level = 'county', year = '16') {
  return request({
    url: '/soil-part/statisticsPhByRegion',
    method: 'get',
    params: {
      level,
      year
    }
  })
}

// 土壤类型面积统计
export function getStatisticsByType() {
  return request({
    url: '/soil-part/statisticsByType',
    method: 'get'
  })
}

// 区域内属性统计
export function getStatisticsByGeometry(wkt) {
  return request({
    url: '/soil-part/statisticsByGeometry',
    method: 'get',
    params: { wkt }
  })
} 