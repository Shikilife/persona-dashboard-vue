<template>
  <div>
    <h2>消費力分布</h2>
    <highcharts :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, watch, inject, onMounted } from 'vue'
import { mockData } from '../mockData'

const filters = inject('filters')
const pendingFilters = inject('pendingFilters')
const powers = [
  '0~1K','1K~2K','2K~5K','5K~10K','10K~50K','50K~100K','100K~1M','1000K~100M+'
]

const chartOptions = ref({
  chart: { type: 'column', height: 320 },
  title: { text: null },
  xAxis: { categories: powers, title: { text: '消費力' } },
  yAxis: { min: 0, title: { text: '人數', align: 'high' } },
  plotOptions: {
    series: {
      cursor: 'pointer',
      point: {
        events: {
          click: function () {
            if (!pendingFilters || !pendingFilters.power) return
            const power = this.category
            const idx = pendingFilters.power.indexOf(power)
            if (idx === -1) pendingFilters.power.push(power)
            else pendingFilters.power.splice(idx, 1)
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
    data: powers
      .filter(p => filters.power.length === 0 || filters.power.includes(p))
      .map(power =>
        filtered.filter(d => d.power === power).length
      )
  }]
  chartOptions.value.xAxis.categories =
    powers.filter(p => filters.power.length === 0 || filters.power.includes(p))
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
