import { rgb } from 'd3-color'

// 整合地理数据和疫情数据
export function mapDataToCountries(geoData, convidData) {
  const convidDataMap = {}
  const provinces = convidData.diseaseh5Shelf.areaTree[0].children
  provinces.forEach((d) => {
    const name = d.name
    const adcode =
      name === '香港'
        ? 810000
        : name === '澳门'
        ? 820000
        : name === '台湾'
        ? 710000
        : d.adcode
    convidDataMap[adcode] = d
  })
  geoData.features.forEach((d) => {
    const adcode = d.properties.adcode
    // 九段线处理
    d.properties.convid = convidDataMap[adcode] || {}
  })
}

// 我把无人感染到感染人数超过 1000 人划分了 5 个等级，
// 每个等级用不同的颜色表示：
// 若该地区无人感染，渲染成 rgb(226, 235, 244) 色
// 若该地区感染人数小于 50，渲染成 rgb(255, 231, 184) 色
// 若该地区感染人数 200 人，渲染成 rgb(255, 208, 166) 色
// 若该地区感染人数 1000 人，渲染成 rgb(255, 170, 128) 色
// 若该地区感染人数 大于等于1000人，渲染成 rgb(255, 112, 79) 色

export function mapColor(nowConfirm) {
  if (!nowConfirm) {
    return 'rgb(226, 235, 244)'
  }
  if (nowConfirm < 50) {
    return 'rgb(255, 231, 184)'
  }
  if (nowConfirm < 200) {
    return 'rgb(255, 208, 166)'
  }
  if (nowConfirm < 1000) {
    return 'rgb(255, 170, 128)'
  }
  return 'rgb(255, 112, 79)'
}

export function colorToArray(clr) {
  // {r: 70, g: 130, b: 180, opacity: 1}
  const c = rgb(clr)
  return [c.r, c.g, c.b, c.opacity * 255]
}
