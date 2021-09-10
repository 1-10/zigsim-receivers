window.addEventListener('load', init)

function init() {
  const render = new PointRender()
  setUpWebSocket(render)
}

function setUpWebSocket(render) {
  const webSocket = new WebSocket('ws://127.0.0.1:5000')
  webSocket.addEventListener('open', _ => {
    console.log('WebSocket connected!')
  })
  
  webSocket.addEventListener('message', event => {
    const jsonData = JSON.parse(event.data)
    if (jsonData.sensordata.bodyTracking !== null && jsonData.sensordata.bodyTracking !== undefined) {
      render.clearPoints("body")
      const bodyTrackings = Object.values(jsonData.sensordata.bodyTracking)
      bodyTrackings.forEach(point => {
        render.createPoint("body", point, COLOR.GREEN)
      })
    }
    
    if (jsonData.sensordata.arkit.position !== null && jsonData.sensordata.arkit.position !== undefined) {
      const position = Object.values(jsonData.sensordata.arkit.position)
      render.createPoint("position", position, COLOR.RED) 
    }
  })
}

const COLOR = { 
  RED: {r: Math.floor(255), g: Math.floor(0), b: Math.floor(0)},
  GREEN: {r: Math.floor(0), g: Math.floor(255), b: Math.floor(0)}
}

class PointRender {

  constructor() {
    const self = this
    const width = window.innerWidth
    const height = window.innerHeight
    const renderer = setUpWebGLRenderer()
    this.camera = setUpCamera()
    const controls = setUpController()
    this.scene = setUpSenene()
  
    tick()

    function setUpWebGLRenderer() {
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
      const container = document.getElementById("body-canvas")
      container.appendChild(renderer.domElement)
      return renderer
    }

    function setUpCamera() {
      const camera = new THREE.PerspectiveCamera(60, width / height)
      camera.position.z = 5
      return camera
    }

    function setUpController() {
      const controls = new THREE.OrbitControls(self.camera)
      return controls
    }

    function setUpSenene() {
      return new THREE.Scene()
    }

    function tick() {
      controls.update()
      renderer.render(self.scene, self.camera)
      requestAnimationFrame(tick)
    }
  }

  createPoint(name, pos, rgb) {
    try {
      const geo = new THREE.Geometry()
      const point = new THREE.Vector3()
      point.x = pos[0]
      point.y = pos[1]
      point.z = pos[2]
      geo.vertices.push(point)
      const color = "rgb(" + rgb.r + "," + rgb.g + "," +  rgb.b +")"
      const mat = new THREE.PointsMaterial({size: 0.025, color: color})
      const mesh = new THREE.Points(geo, mat)
      mesh.name = name
      this.scene.add(mesh)
    } catch {
      console.log("Couldn't create point!")
    }
  }

  clearPoints(name) {
    for(let i = this.scene.children.length - 1; i >= 0; i--) { 
      const obj = this.scene.children[i]
      if (obj.name === name) {
        this.scene.remove(obj)
      }
    }
  }
}