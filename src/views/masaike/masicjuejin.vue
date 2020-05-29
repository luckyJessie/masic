<template>
  <div class="container">
    <div class="operations">
      <ul>
        <li @click="mosaic">马赛克</li>
        <li @click="addText">添加文字</li>
        <li @click="tailor">裁剪</li>
        <li @click="rotate">旋转</li>
        <li @click="exportImg">导出图片</li>
      </ul>
    </div>
    <canvas ref="imgContent" class="img-wrap">
      你的浏览器太low🌶
    </canvas>
  </div>
</template>

<script>
export default {
  data () {
    return {
      context: '',
      canvas: '',
      isMasic: false,
      isText: false,
      isTailor: false,
      isTranslate: false,
      squareEdgeLength: 20,
      angle: 0,
      img: ''
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      let imgContent = this.$refs.imgContent
      this.canvas = imgContent
      this.context = imgContent.getContext('2d')
      let Img = new Image()
      this.image = Img
      Img.crossOrigin = 'Anonymous'
      Img.src = 'http://imgaliyuncdn.miaopai.com/stream/lJyo8OwrZyA0lITWHbsiOLX164X~b6H-n3cTgg___IMG_21432.jpeg'
      this.canvas.setAttribute('width', Img.width)
      this.canvas.setAttribute('height', Img.height)
      let self = this
      Img.onload = () => {
        let beginX, beginY, endX, endY
        self.context.drawImage(Img, 0, 0)
        self.context.save()

        self.canvas.addEventListener('mousedown', e => {
          beginX = e.offsetX
          beginY = e.offsetY
          self.canvas.addEventListener('mouseup', e => {
            endX = e.offsetX
            endY = e.offsetY
            if (self.isMasic) {
              self.makeGrid(beginX, beginY, endX - beginX, endY - beginY)
              return false
            }
            if (self.isTailor) {
              self.context.drawImage(Img, beginX, beginY, endX - beginX, endY - beginY, 0, 0, endX - beginX, endY - beginY)
              return false
            }
          })
        })
      }
    },
    drawRect  (x, y, width, height, fillStyle, lineWidth, strokeStyle, globalAlpha) {
      this.context.beginPath()
      this.context.rect(x, y, width, height)
      this.context.lineWidth = lineWidth
      this.context.strokeStyle = strokeStyle
      fillStyle && (this.context.fillStyle = fillStyle)
      globalAlpha && (this.context.globalAlpha = globalAlpha)

      this.context.fill()
      this.context.stroke()
    },
    // 打马赛克
    mosaic () {
      this.resetClickStatus()
      this.isMasic = true
    },
    makeGrid (beginX, beginY, rectWidth, rectHight) {
      const row = Math.round(rectWidth / this.squareEdgeLength) + 1
      const column = Math.round(rectHight / this.squareEdgeLength) + 1
      for (let i = 0; i < row * column; i++) {
        let x = (i % row) * this.squareEdgeLength + beginX
        let y = parseInt(i / row) * this.squareEdgeLength + beginY
        this.setColor(x, y)
      }
    },
    setColor (x, y) {
      const imgData = this.context.getImageData(x, y, this.squareEdgeLength, this.squareEdgeLength).data
      let r = 0
      let g = 0
      let b = 0
      console.log(this.context.getImageData(x, y, this.squareEdgeLength, this.squareEdgeLength), JSON.stringify(imgData))
      for (let i = 0; i < imgData.length; i += 4) {
        r += imgData[i]
        g += imgData[i + 1]
        b += imgData[i + 2]
      }
      r = Math.round(r / (imgData.length / 4))
      g = Math.round(g / (imgData.length / 4))
      b = Math.round(b / (imgData.length / 4))
      this.drawRect(x, y, this.squareEdgeLength, this.squareEdgeLength, `rgb(${r}, ${g}, ${b})`, 2, `rgb(${r}, ${g}, ${b})`)
    },
    // 添加文字
    addText () {
      this.resetClickStatus()
      this.isText = true
      console.log('添加文字')
    },
    // 裁剪
    tailor () {
      this.resetClickStatus()
      this.isTailor = true
      console.log('裁剪')
    },
    // 旋转
    rotate () {
      // if (this.angle === 360) {
      //   this.angle = 90
      // } else {
      //   this.angle += 90
      // }
      // if ([90, 270].includes(this.angle)) {
      //   this.canvas.setAttribute('width', this.image.height)
      //   this.canvas.setAttribute('height', this.image.width)
      // } else {
      //   this.canvas.setAttribute('width', this.image.width)
      //   this.canvas.setAttribute('height', this.image.height)
      // }
      const x = this.image.width / 2
      const y = this.image.height / 2
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height) // 清理画布内容
      this.context.translate(x, y)
      this.context.rotate(90 * Math.PI / 180)
      this.context.translate(-x, -y)
      this.context.drawImage(this.image, 0, 0)
    },
    resetClickStatus () {
      this.isMasic = false
      this.isText = false
      this.isTailor = false
      this.isTranslate = false
    },
    exportImg () {
      this.resetClickStatus()
      const exportUrl = this.canvas.toDataURL('image/jpeg')
      let a = document.createElement('a')
      a.setAttribute('download', '')
      a.href = exportUrl
      document.body.appendChild(a)
      a.click()
    }
  }
}
</script>

<style scoped>
  .operations {
    width: 1200px;
    margin: 0 auto;
  }
  .operations ul {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  .operations li {
    list-style: none;
    margin-right: 20px;
    cursor: pointer;
  }
  .img-wrap {
    display: block;
    margin: 0 auto;
  }
</style>
