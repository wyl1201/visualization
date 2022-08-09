import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="home">
    <a href="./pages/html/index.html">图形基础-HTML+CSS</a>
    <a href="./pages/svg/index.html">图形基础-SVG</a>
    <a href="./pages/webgl/index.html">图形基础-WebGL</a>
    <a href="./pages/covid-vis/mercator-china-svg.html">实时疫情--SVG</a>
    <a href="./pages/covid-vis//mercator-china-canvas.html">实时疫情--Canvas</a>
    <a href="./pages/covid-vis/china-webgl.html">实时疫情--WebGL 使用@wayz/react-gl</a>
  </div>
`

setupCounter(document.querySelector('#counter'))
