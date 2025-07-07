import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
   base: '/persona-dashboard-vue/',  // ★★這一行必加！★★
})
