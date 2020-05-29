<template>
  <div>
    <div id="box">
      <canvas id="canvas"></canvas>
      <button id='drawAll'>Mosaic All</button>
      <button id='clearAll'>Clear Mosaic</button>
    </div>
  </div>
</template>
<style>
</style>
<script>
import Mosaic from 'image-mosaic'
export default {
  data () {
    return {}
  },
  created () {
  },
  mounted () {
    // Mosaic on full image.
    // mosaic.drawAllTiles()
    // https://raw.githubusercontent.com/zhengsk/image-masaic/master/src/images/demo.jpg
    this.drawImageToCanvas('http://imgaliyuncdn.miaopai.com/stream/lJyo8OwrZyA0lITWHbsiOLX164X~b6H-n3cTgg___IMG_21432.jpeg').then(ctx => {
      const mosaic = new Mosaic(ctx)
      const MouseEvents = {
        init () {
          mosaic.context.canvas.addEventListener('mousedown', MouseEvents.mousedown)
        },

        mousedown () {
          mosaic.context.canvas.addEventListener('mousemove', MouseEvents.mousemove)
          document.addEventListener('mouseup', MouseEvents.mouseup)
        },

        mousemove (e) {
          if (e.shiftKey) {
            mosaic.eraseTileByPoint(e.layerX, e.layerY)
            return
          }
          mosaic.drawTileByPoint(e.layerX, e.layerY)
        },

        mouseup () {
          mosaic.context.canvas.removeEventListener('mousemove', MouseEvents.mousemove)
          document.removeEventListener('mouseup', MouseEvents.mouseup)
        }
      }
      MouseEvents.init()

      document.querySelector('#drawAll').addEventListener('click', () => {
        mosaic.drawAllTiles()
      })

      document.querySelector('#clearAll').addEventListener('click', () => {
        mosaic.eraseAllTiles()
      })
    })
  },
  computed: {
  },
  methods: {
    drawImageToCanvas (imageUrl) {
      const canvas = document.querySelector('#canvas')
      const ctx = canvas.getContext('2d')
      return new Promise((resolve, reject) => {
        const image = new Image()
        image.crossOrigin = 'Annoymous'
        image.onload = function () {
          canvas.width = this.width
          canvas.height = this.height

          ctx.drawImage(this, 0, 0, this.width, this.height)

          resolve(ctx)
        }

        image.src = imageUrl
      })
    }
  }
}
</script>
<style>
  #box {
    width: 500px;
    height: 600px;
    margin: 0 auto;
    position: relative;
  }
  #box #canvas{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin:0 auto;
    max-width:100%;
    max-height: 100%;
  }
</style>
