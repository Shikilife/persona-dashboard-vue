# Persona Dashboard Vue

> 使用 **Vue 3 + Vite** 搭配 **Highcharts** 與 **Element Plus** 製作的多維篩選資料視覺化互動儀表板。支援圖表點擊、條件聯動、介面與響應式設計。

---
🚩 已完成內容

✅ 完成 4 張主要資料圖表（性別年齡、註冊地圓餅、消費傾向、消費力直方圖），每張皆支援點擊資料進行條件篩選

✅ 實作條件「多維度聯動」——篩選任一條件，全部圖表同步刷新

✅ 支援 UI 條件複選（Element Plus 標籤、Checkbox）+ 圖表互動選取

✅ 完整 UI / 響應式設計（RWD）

✅ mockData.js 實作 500 筆多維測試資料，切換真實 json 也可用

✅ 完整 ESLint / Prettier 設定、統一開發格式


---

## 🚀 快速開始

```bash
# 1. 安裝相依套件
npm install

# 2. 啟動開發伺服器 (http://localhost:5173)
npm run dev
```

### 工具版本

| 工具           | 版本   |
| ------------ | ---- |
| Node.js      | v20+ |
| npm          | 10+  |
| Vite         | 5.x  |
| Vue          | 3.x  |
| Highcharts   | 12.x |
| Element Plus | 2.x  |

---

## 🔧 技術棧

* **前端框架：** Vue 3（Composition API）
* **開發環境：** Vite
* **圖表：** Highcharts（含高互動條件點擊）
* **UI 組件庫：** Element Plus（蘋果風格美化）
* **Lint/Format：** ESLint、Prettier

---

## 🎯 專案特色

* 4 張主要圖表可互動篩選、點擊條件即時聯動
* 可透過 UI 選單＋圖表點擊同步收斂條件
* 支援多維度條件疊加，極速響應（500 筆 mock 資料）
* RWD 響應式、蘋果 Apple 風格美化

---

## 📝 學習進度與紀錄

> 每一週學習筆記、程式改動紀錄皆公開於 HackMD，歡迎參考：

1. [Vue 3  Day18](https://hackmd.io/@Shiki9029/BJbOFNIHle)
2. [Vue 3  Day19](https://hackmd.io/@Shiki9029/ry-jW-_See)
3. [Vue 3  Day20](https://hackmd.io/@Shiki9029/SkE6R-OHxg)
4. [Vue 3  Day21](https://hackmd.io/@Shiki9029/Hk7Rd0urxg)
5. [Vue 3  Day22](https://hackmd.io/@Shiki9029/BkkODDtHge)
6. [Vue 3  Day23](https://hackmd.io/@Shiki9029/BJwvzYKBlx)
7. [Vue 3  Day24](https://hackmd.io/@Shiki9029/SJdxOotSex)

---

## 📁 目錄結構

```
.
├── public/
│   └── persona_target_guid.json # 可切換使用真實資料
├── src/
│   ├── components/
│   │   ├── GenderAgeBar.vue
│   │   ├── CityPieChart.vue
│   │   ├── TendencyBar.vue
│   │   └── PowerBar.vue
│   ├── filters.js
│   ├── mockData.js
│   └── App.vue
├── README.md
└── ...
```


