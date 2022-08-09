import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { AMapGL, LabeledGeoJsonLayer, useMapGLContext } from '@wayz/react-gl'
import { colorToArray, mapColor, mapDataToCountries } from '../../utils'
import '~/style.css'
import './main.css'

function MapLegend() {
  /* Map Legend  */
  return (
    <div className="map-legend">
      <div className="item" style={{ backgroundColor: 'rgb(255, 112, 79)' }}>
        <p>1000人以上</p>
      </div>
      <div className="item" style={{ backgroundColor: 'rgb(255, 170, 128)' }}>
        <p>200-999人</p>
      </div>
      <div className="item" style={{ backgroundColor: 'rgb(255, 208, 166)' }}>
        <p>50-199人</p>
      </div>
      <div className="item" style={{ backgroundColor: 'rgb(255, 231, 184)' }}>
        <p>1-49人</p>
      </div>
      <div className="item" style={{ backgroundColor: 'rgb(226, 235, 244)' }}>
        <p>0人</p>
      </div>
    </div>
  )
}

function CovinVisChinaWebGL() {
  const [covid, setCovidData] = useState(null)
  const { setHoverInfo } = useMapGLContext()

  useEffect(() => {
    ;(async function () {
      // 中国地图的地理数据
      const chinaData = await (await fetch('./asset/china-geojson.json')).json()

      // 疫情数据
      const { data } = await (
        await fetch(
          'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=localCityNCOVDataList,diseaseh5Shelf'
        )
      ).json()

      mapDataToCountries(chinaData, data)
      setCovidData(chinaData)
    })()
  }, [])

  return (
    <LabeledGeoJsonLayer
      id="covid-layer"
      visible={true}
      // pickable={true}
      data={covid}
      filled={true}
      stroked={true}
      lineWidthScale={0.5}
      lineWidthMinPixels={1}
      getFillColor={(f) => {
        const { convid } = f.properties
        // 确诊人数
        const nowConfirm = convid.total ? convid.total.nowConfirm : undefined
        // 设置填充颜色
        const fillStyle =
          nowConfirm != undefined ? mapColor(nowConfirm) : 'transparent'
        return colorToArray(fillStyle)
      }}
      getLabel={(f) =>
        `${f.properties.name} 确诊人数：${f.properties?.convid?.total?.nowConfirm}`
      }
      getLabelSize={10}
    />
  )
}

function App() {
  return (
    <div className="App">
      <AMapGL MAP_ACCESS_TOKEN="27e632cb0e0b2d224610df6a92e7865f">
        <CovinVisChinaWebGL />
        <MapLegend />
      </AMapGL>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
