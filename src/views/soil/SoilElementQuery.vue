<template>
  <div class="soil-element-query">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>土壤要素查询</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <div class="search-form">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="省份">
            <el-input v-model="searchForm.provinceName" placeholder="请输入省份" clearable />
          </el-form-item>
          <el-form-item label="城市">
            <el-input v-model="searchForm.cityName" placeholder="请输入城市" clearable />
          </el-form-item>
          <el-form-item label="县区">
            <el-input v-model="searchForm.countyName" placeholder="请输入县区" clearable />
          </el-form-item>
          <el-form-item label="pH值范围">
            <el-input-number 
              v-model="searchForm.phMin" 
              :precision="2" 
              :step="0.1" 
              placeholder="最小值"
              :min="0"
              :controls="false"
              @change="handleNumberChange('phMin', $event)"
            />
            <span class="range-separator">-</span>
            <el-input-number 
              v-model="searchForm.phMax" 
              :precision="2" 
              :step="0.1" 
              placeholder="最大值"
              :min="0"
              :controls="false"
              @change="handleNumberChange('phMax', $event)"
            />
          </el-form-item>
          <el-form-item label="有机质含量范围">
            <el-input-number 
              v-model="searchForm.organicMatterMin" 
              :precision="2" 
              :step="0.1" 
              placeholder="最小值"
              :min="0"
              :controls="false"
              @change="handleNumberChange('organicMatterMin', $event)"
            />
            <span class="range-separator">-</span>
            <el-input-number 
              v-model="searchForm.organicMatterMax" 
              :precision="2" 
              :step="0.1" 
              placeholder="最大值"
              :min="0"
              :controls="false"
              @change="handleNumberChange('organicMatterMax', $event)"
            />
          </el-form-item>
          <el-form-item label="有效磷范围">
            <el-input-number 
              v-model="searchForm.phosphorusMin" 
              :precision="2" 
              :step="0.1" 
              placeholder="最小值"
              :min="0"
              :controls="false"
              @change="handleNumberChange('phosphorusMin', $event)"
            />
            <span class="range-separator">-</span>
            <el-input-number 
              v-model="searchForm.phosphorusMax" 
              :precision="2" 
              :step="0.1" 
              placeholder="最大值"
              :min="0"
              :controls="false"
              @change="handleNumberChange('phosphorusMax', $event)"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      
      <el-table
        v-loading="loading"
        :data="filteredTableData"
        border
        style="width: 100%"
        @sort-change="handleSortChange">
        <!-- 基本信息 -->
        <el-table-column label="基本信息" align="center">
          <el-table-column prop="id" label="ID" width="80" sortable="custom" />
          <el-table-column prop="provinceName" label="省份" width="120" sortable="custom" />
          <el-table-column prop="cityName" label="城市" width="120" sortable="custom" />
          <el-table-column prop="countyName" label="县区" width="120" sortable="custom" />
          <el-table-column prop="townName" label="乡镇" width="120" sortable="custom" />
        </el-table-column>

        <!-- 土壤分类信息 -->
        <el-table-column label="土壤分类" align="center">
          <el-table-column prop="provinceSoilCode" label="省级土壤编码" width="120" sortable="custom" />
          <el-table-column prop="provinceSoilName" label="省级土壤名称" width="120" sortable="custom" />
          <el-table-column prop="provinceSoilTypeName" label="省级土壤类型" width="120" sortable="custom" />
          <el-table-column prop="provinceSubSoilName" label="省级亚类土壤" width="120" sortable="custom" />
          <el-table-column prop="provinceSoilAttrName" label="土壤属性名称" width="120" sortable="custom" />
          <el-table-column prop="provinceSoilBreedName" label="土壤种类名称" width="120" sortable="custom" />
          <el-table-column prop="countySoilCode" label="县级土壤编码" width="120" sortable="custom" />
        </el-table-column>

        <!-- pH值相关 -->
        <el-table-column label="pH值相关" align="center">
          <el-table-column prop="ph16" label="pH值" width="120" sortable="custom" />
          <el-table-column prop="change8208" label="pH变化(1982-2008)" width="150" sortable="custom" />
          <el-table-column prop="change0816" label="pH变化(2008-2016)" width="150" sortable="custom" />
          <el-table-column prop="phChange8216" label="pH变化(1982-2016)" width="150" sortable="custom" />
        </el-table-column>

        <!-- 土壤养分 -->
        <el-table-column label="土壤养分" align="center">
          <el-table-column prop="organicMatter" label="有机质含量" width="120" />
          <el-table-column prop="totalNitrogen" label="全氮" width="120" />
          <el-table-column prop="alkalineNitrogen" label="碱解氮" width="120" />
          <el-table-column prop="availablePhosphorus" label="有效磷" width="120" />
          <el-table-column prop="availablePotassium" label="有效钾" width="120" />
          <el-table-column prop="totalPhosphorus" label="全磷" width="120" />
          <el-table-column prop="slowReleasePotassium" label="缓效钾" width="120" />
        </el-table-column>

        <!-- 土壤物理性质 -->
        <el-table-column label="土壤物理性质" align="center">
          <el-table-column prop="ploughLayerThickness" label="耕层厚度" width="120" />
          <el-table-column prop="barrierLayerThickness" label="障碍层厚度" width="120" />
          <el-table-column prop="siltContent" label="粉粒含量" width="120" />
          <el-table-column prop="clayContent" label="粘粒含量" width="120" />
          <el-table-column prop="sandContent" label="砂粒含量" width="120" />
          <el-table-column prop="bulkDensity" label="容重" width="120" />
          <el-table-column prop="density" label="密度" width="120" />
        </el-table-column>

        <!-- 地形信息 -->
        <el-table-column label="地形信息" align="center">
          <el-table-column prop="slope" label="坡度" width="120" />
          <el-table-column prop="aspect" label="坡向" width="120" />
          <el-table-column prop="elevation" label="海拔" width="120" />
          <el-table-column prop="landform" label="地貌" width="120" />
          <el-table-column prop="elevationZone" label="海拔分区" width="120" />
        </el-table-column>

        <!-- 气候信息 -->
        <el-table-column label="气候信息" align="center">
          <el-table-column prop="annualTemperature" label="年均温" width="120" />
          <el-table-column prop="annualPrecipitation" label="年降水量" width="120" />
          <el-table-column prop="extremeLowTemp" label="极端低温" width="120" />
          <el-table-column prop="climateZone" label="气候区" width="120" />
          <el-table-column prop="rainPh" label="降雨pH" width="120" />
        </el-table-column>

        <!-- 其他属性 -->
        <el-table-column label="其他属性" align="center">
          <el-table-column prop="cec" label="阳离子交换量" width="150" />
          <el-table-column prop="exchangeableCalcium" label="交换性钙" width="120" />
          <el-table-column prop="exchangeableMagnesium" label="交换性镁" width="120" />
          <el-table-column prop="internationalTexture" label="国际质地" width="120" />
          <el-table-column prop="ploughLayerSalt" label="耕层含盐量" width="120" />
          <el-table-column prop="irrigationCondition" label="灌溉条件" width="120" />
          <el-table-column prop="drainageCapacity" label="排水能力" width="120" />
          <el-table-column prop="maturity" label="成熟度" width="120" />
          <el-table-column prop="unitArea" label="单位面积" width="120" />
          <el-table-column prop="farea" label="面积" width="120" />
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="filteredTotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getSoilPartList } from '@/api/soilPart'

const loading = ref(false)
const rawTableData = ref([]) // 存储原始数据
const currentPage = ref(1)
const pageSize = ref(10)

// 搜索表单 - 修改初始值为 undefined
const searchForm = ref({
  provinceName: '',
  cityName: '',
  countyName: '',
  phMin: undefined,
  phMax: undefined,
  organicMatterMin: undefined,
  organicMatterMax: undefined,
  phosphorusMin: undefined,
  phosphorusMax: undefined
})

// 排序状态
const sortState = ref({
  prop: '',
  order: ''
})

// 处理数值输入变化
const handleNumberChange = (field, value) => {
  if (value === null || value === '' || value === undefined) {
    searchForm.value[field] = undefined
  }
}

// 过滤和排序后的数据
const filteredData = computed(() => {
  let result = [...rawTableData.value]

  // 应用搜索过滤
  if (searchForm.value.provinceName) {
    result = result.filter(item => 
      item.provinceName?.toLowerCase().includes(searchForm.value.provinceName.toLowerCase())
    )
  }
  if (searchForm.value.cityName) {
    result = result.filter(item => 
      item.cityName?.toLowerCase().includes(searchForm.value.cityName.toLowerCase())
    )
  }
  if (searchForm.value.countyName) {
    result = result.filter(item => 
      item.countyName?.toLowerCase().includes(searchForm.value.countyName.toLowerCase())
    )
  }
  
  // pH值范围过滤
  if (searchForm.value.phMin !== undefined) {
    result = result.filter(item => item.ph16 >= searchForm.value.phMin)
  }
  if (searchForm.value.phMax !== undefined) {
    result = result.filter(item => item.ph16 <= searchForm.value.phMax)
  }
  
  // 有机质含量范围过滤
  if (searchForm.value.organicMatterMin !== undefined) {
    result = result.filter(item => item.organicMatter >= searchForm.value.organicMatterMin)
  }
  if (searchForm.value.organicMatterMax !== undefined) {
    result = result.filter(item => item.organicMatter <= searchForm.value.organicMatterMax)
  }
  
  // 有效磷范围过滤
  if (searchForm.value.phosphorusMin !== undefined) {
    result = result.filter(item => item.availablePhosphorus >= searchForm.value.phosphorusMin)
  }
  if (searchForm.value.phosphorusMax !== undefined) {
    result = result.filter(item => item.availablePhosphorus <= searchForm.value.phosphorusMax)
  }

  // 应用排序
  if (sortState.value.prop && sortState.value.order) {
    const isAsc = sortState.value.order === 'ascending'
    result.sort((a, b) => {
      const valueA = a[sortState.value.prop]
      const valueB = b[sortState.value.prop]
      
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return isAsc ? valueA - valueB : valueB - valueA
      }
      
      if (valueA === null || valueA === undefined) return isAsc ? -1 : 1
      if (valueB === null || valueB === undefined) return isAsc ? 1 : -1
      
      return isAsc 
        ? valueA.toString().localeCompare(valueB.toString())
        : valueB.toString().localeCompare(valueA.toString())
    })
  }

  return result
})

// 分页后的数据
const filteredTableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredData.value.slice(start, end)
})

// 过滤后的总数
const filteredTotal = computed(() => filteredData.value.length)

// 获取表格数据
const getTableData = async () => {
  loading.value = true
  try {
    const res = await getSoilPartList()
    if (res.data) {
      rawTableData.value = res.data
    }
  } catch (error) {
    console.error('获取土壤分区数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 处理排序变化
const handleSortChange = ({ prop, order }) => {
  sortState.value = { prop, order }
}

// 处理搜索
const handleSearch = () => {
  currentPage.value = 1 // 重置到第一页
}

// 处理重置
const handleReset = () => {
  searchForm.value = {
    provinceName: '',
    cityName: '',
    countyName: '',
    phMin: undefined,
    phMax: undefined,
    organicMatterMin: undefined,
    organicMatterMax: undefined,
    phosphorusMin: undefined,
    phosphorusMax: undefined
  }
  currentPage.value = 1
  sortState.value = { prop: '', order: '' }
}

// 处理每页条数变化
const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
}

// 处理页码变化
const handleCurrentChange = (val) => {
  currentPage.value = val
}

onMounted(() => {
  getTableData()
})
</script>

<style scoped>
.soil-element-query {
  padding: 20px;
}

.search-form {
  margin-bottom: 20px;
}

.range-separator {
  margin: 0 8px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

:deep(.el-table) {
  /* 允许表格横向滚动 */
  overflow-x: auto;
}

:deep(.el-table__body) td {
  /* 数值型单元格右对齐 */
  &.is-number {
    text-align: right;
  }
}

:deep(.el-form-item) {
  margin-bottom: 16px;
  margin-right: 16px;
}
</style> 