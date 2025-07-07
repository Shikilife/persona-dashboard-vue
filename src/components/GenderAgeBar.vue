<template>
  <div>
    <h2>性別與年齡分布</h2>
    <highcharts :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, watch, inject, onMounted } from 'vue'
import { mockData } from '../mockData'

const filters = inject('filters')
const pendingFilters = inject('pendingFilters')

const categories = ['<=20','21~30','31~40','41~50','51~60','>=61','未填寫']
const genders = ['男','女','未填寫']

const chartOptions = ref({
  chart: { type: 'bar', height: 400 },
  title: { text: null },
  xAxis: { categories, title: { text: '年齡' } },
  yAxis: { min: 0, title: { text: '人數', align: 'high' } },
  legend: { reversed: true },
  plotOptions: {
    series: {
      stacking: 'normal',
      cursor: 'pointer',
      allowPointSelect: true,
      point: {
        events: {
          click: function () {
            // 健壯性保護
            if (!pendingFilters || !pendingFilters.gender || !pendingFilters.age) return
            const gender = this.series.name
            const age = this.category
            // 性別多選
            const gidx = pendingFilters.gender.indexOf(gender)
            if (gidx === -1) pendingFilters.gender.push(gender)
            else pendingFilters.gender.splice(gidx, 1)
            // 年齡多選
            const aidx = pendingFilters.age.indexOf(age)
            if (aidx === -1) pendingFilters.age.push(age)
            else pendingFilters.age.splice(aidx, 1)
            // (進階可加 applyFilters() 立即套用)
          }
        }
      }
    }
  },
  series: [],
  credits: { enabled: false } 
})

function updateChart() {
  const filtered = mockData.filter(item =>
    (filters.gender.length === 0 || filters.gender.includes(item.gender)) &&
    (filters.age.length === 0 || filters.age.includes(item.age)) &&
    (filters.city.length === 0 || filters.city.includes(item.city)) &&
    (filters.tendency.length === 0 || filters.tendency.includes(item.tendency)) &&
    (filters.power.length === 0 || filters.power.includes(item.power))
  )
  chartOptions.value.series = genders
    .filter(g => filters.gender.length === 0 || filters.gender.includes(g))
    .map(gender => ({
      name: gender,
      data: categories
        .filter(a => filters.age.length === 0 || filters.age.includes(a))
        .map(age =>
          filtered.filter(d => d.gender === gender && d.age === age).length
        )
    }))
  chartOptions.value.xAxis.categories =
    categories.filter(a => filters.age.length === 0 || filters.age.includes(a))
}

onMounted(updateChart)
watch(
  () => [
    filters.gender.slice(),
    filters.age.slice(),
    filters.city.slice(),
    filters.tendency.slice(),
    filters.power.slice()
  ],
  updateChart,
  { deep: true }
)
</script>
