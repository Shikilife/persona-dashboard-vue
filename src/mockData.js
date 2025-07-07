// src/mockData.js
const genders = ['男', '女', '未填寫']
const ages = ['<=20', '21~30', '31~40', '41~50', '51~60', '>=61', '未填寫']
const cities = ['台北市','新北市','基隆市','宜蘭縣','新竹市','新竹縣','桃園市','苗栗縣','台中市','嘉義市','雲林縣','台南市','高雄市','未填寫']
const tendencies = ['歲末酬賓必來','母親節必來','年中慶必來','周年慶必來','價格敏感客群']
const powers = ['0~1K','1K~2K','2K~5K','5K~10K','10K~50K','50K~100K','100K~1M','1000K~100M+']

// 產生 500 筆假資料
function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const mockData = Array.from({length: 500}, (_,i) => ({
  id: i+1,
  gender: randomPick(genders),
  age: randomPick(ages),
  city: randomPick(cities),
  tendency: randomPick(tendencies),
  power: randomPick(powers)
}))
