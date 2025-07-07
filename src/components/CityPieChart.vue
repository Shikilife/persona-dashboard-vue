<template>
  <div>
    <h2>註冊地分布</h2>
    <highcharts :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, watch, inject, onMounted } from 'vue'
import { mockData } from '../mockData'

const filters = inject('filters')
const pendingFilters = inject('pendingFilters')
const cities = [
  '台北市','新北市','基隆市','宜蘭縣','新竹市','新竹縣','桃園市','苗栗縣','台中市',
  '嘉義市','雲林縣','台南市','高雄市','未填寫'
]

const chartOptions = ref({
  chart: { type: 'pie', height: 320 },
  title: { text: null },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: { enabled: true, format: '{point.name}: {point.y}' },
      point: {
        events: {
          click: function () {
            if (!pendingFilters || !pendingFilters.city) return
            const city = this.name
            const idx = pendingFilters.city.indexOf(city)
            if (idx === -1) pendingFilters.city.push(city)
            else pendingFilters.city.splice(idx, 1)
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
    data: cities
      .filter(c => filters.city.length === 0 || filters.city.includes(c))
      .map(city => ({
        name: city,
        y: filtered.filter(d => d.city === city).length
      }))
  }]
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
