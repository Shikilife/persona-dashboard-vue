<template>
  <el-button @click="showFilters = !showFilters" type="primary" plain size="small" class="mb-2"
    style="border-radius: 14px;">
    <span v-if="showFilters">收合篩選</span>
    <span v-else>展開篩選</span>
  </el-button>
  <transition name="fade">
    <div v-if="showFilters" class="filters-box">
      <div v-for="grp in filterGroups" :key="grp.label" class="filter-group">
        <label>{{ grp.label }}</label>
        <el-checkbox-group v-model="pendingFilters[grp.key]" size="large">
          <el-checkbox v-for="opt in grp.options" :value="opt" :key="opt" class="custom-checkbox">{{ opt
            }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="filter-btn-row">
        <el-button type="primary" plain @click="applyFilters" size="large">篩選</el-button>
        <el-button type="info" plain @click="resetFilters" size="large">重置</el-button>
      </div>
      <div class="filter-tags">
        <template v-for="(arr, type) in pendingFilters" :key="type">
          <el-tag v-for="val in arr" :key="type + '-' + val" closable size="large" @close="removeTag(type, val)"
            :type="filters[type].includes(val) ? 'success' : 'info'" effect="light" class="filter-tag"
            @click="() => handleTagClick(type, val)">{{ val }}</el-tag>
        </template>
      </div>
    </div>
  </transition>
  <!-- ====== 這裡是四格圖表 ====== -->
  <div class="dash-grid">
    <GenderAgeBar />
    <CityPieChart />
    <TendencyBar />
    <PowerHistogram />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import { filters, pendingFilters } from './filters'
import GenderAgeBar from './components/GenderAgeBar.vue'
import CityPieChart from './components/CityPieChart.vue'


import TendencyBar from './components/TendencyBar.vue'
import PowerHistogram from './components/PowerHistogram.vue'

const showFilters = ref(true)
provide('filters', filters)
provide('pendingFilters', pendingFilters)
const filterGroups = [
  { key: 'gender', label: '性別：', options: ['男', '女', '未填寫'] },
  { key: 'age', label: '年齡：', options: ['<=20', '21~30', '31~40', '41~50', '51~60', '>=61', '未填寫'] },
  { key: 'city', label: '註冊地：', options: ['台北市', '新北市', '基隆市', '宜蘭縣', '新竹市', '新竹縣', '桃園市', '苗栗縣', '台中市', '嘉義市', '雲林縣', '台南市', '高雄市', '未填寫'] },
  { key: 'tendency', label: '消費傾向：', options: ['歲末酬賓必來', '母親節必來', '年中慶必來', '周年慶必來', '價格敏感客群'] },
  { key: 'power', label: '消費力：', options: ['0~1K', '1K~2K', '2K~5K', '5K~10K', '10K~50K', '50K~100K', '100K~1M', '1000K~100M+'] },
]

// === 必須加這些 function ===
function applyFilters() {
  Object.keys(filters).forEach(k => {
    filters[k].splice(0)
    filters[k].push(...pendingFilters[k])
  })
}
function resetFilters() {
  Object.keys(filters).forEach(k => filters[k].splice(0))
  Object.keys(pendingFilters).forEach(k => pendingFilters[k].splice(0))
}
function removeTag(type, val) {
  const arr = pendingFilters[type]
  const idx = arr.indexOf(val)
  if (idx >= 0) arr.splice(idx, 1)
}
function handleTagClick(type, val) {
  const arr = pendingFilters[type]
  const idx = arr.indexOf(val)
  if (idx >= 0) arr.splice(idx, 1)
  else arr.push(val)
}
</script>

<style>
/* ...保持你之前那段 style 即可 ... */
.dash-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 36px;
}

@media (max-width: 900px) {
  .dash-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
