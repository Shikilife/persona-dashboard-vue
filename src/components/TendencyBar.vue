<template>
  <div>
    <h2>消費傾向分布</h2>
    <highcharts :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, watch, inject, onMounted } from 'vue'
import { mockData } from '../mockData'

const filters = inject('filters')
const pendingFilters = inject('pendingFilters')
const tendencies = [
  '歲末酬賓必來','母親節必來','年中慶必來','周年慶必來','價格敏感客群'
]

const chartOptions = ref({
  chart: { type: 'column', height: 320 },
  title: { text: null },
  xAxis: { categories: tendencies, title: { text: '消費傾向' } },
  yAxis: { min: 0, title: { text: '人數', align: 'high' } },
  plotOptions: {
    series: {
      cursor: 'pointer',
      point: {
        events: {
          click: function () {
            if (!pendingFilters || !pendingFilters.tendency) return
            const tendency = this.category
            const idx = pendingFilters.tendency.indexOf(tendency)
            if (idx === -1) pendingFilters.tendency.push(tendency)
            else pendingFilters.tendency.splice(idx, 1)
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
  chartOptions.value.series = [{
    name: '人數',
    data: tendencies
      .filter(t => filters.tendency.length === 0 || filters.tendency.includes(t))
      .map(tendency =>
        filtered.filter(d => d.tendency === tendency).length
      )
  }]
  chartOptions.value.xAxis.categories =
    tendencies.filter(t => filters.tendency.length === 0 || filters.tendency.includes(t))
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
