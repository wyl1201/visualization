import * as topojson from 'topojson-client'
import '~/style.css'
import './main.css'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
ctx.fillStyle = 'black'

const { width, height } = canvas.getBoundingClientRect()

function projection([longitude, latitude]) {
  const x = (width * (180 + longitude)) / 360
  const y = height * (1 - (90 + latitude) / 180)
  return [x, y]
}

function drawPoints(ctx, points) {
  ctx.beginPath()
  ctx.moveTo(...points[0])
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(...points[i])
  }
  ctx.fill()
}

;(async function () {
  const worldData = await (await fetch('./asset/world-topojson.json')).json()
  const countries = topojson.feature(worldData, 'countries')
  console.log(
    `🚀 ~ file: mercator-topojson.html ~ line 44 ~ countries`,
    countries
  )
  const { features } = countries
  features.forEach(({ geometry }) => {
    if (geometry.type === 'MultiPolygon') {
      const { coordinates } = geometry
      if (coordinates) {
        coordinates.forEach((contours) => {
          contours.forEach((path) => {
            const points = path.map(projection)
            drawPoints(ctx, points)
          })
        })
      }
    } else if (geometry.type === 'Polygon') {
      const contours = geometry.coordinates
      contours.forEach((path) => {
        const points = path.map(projection)
        drawPoints(ctx, points)
      })
    }
  })
})()
