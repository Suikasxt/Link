const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const radius = 15
const colWidth = 35
const rowHeight = 35
const btnWidth = 60
const btnHeight = 30
const ruleWidth = 280

export default class GameMap{
  constructor(main) {
    this.data = main.data
    this.wPos = (screenWidth - main.data.M * colWidth) / 2
    this.hPos = (screenHeight - main.data.N * rowHeight) / 2
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()
      for (var i = 0; i < main.data.M; i++) {
        let sx = this.wPos + i * colWidth
        let sy = this.hPos
        let ex = sx + colWidth
        let ey = sy + main.data.N * rowHeight

        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        if ((x > sx) && (x < ex) && (y > sy) && (y < ey)) {
          main.player(i)
        }
      }
    }).bind(this))
  }


  renderGameScore(ctx, score) {
    ctx.fillStyle = "red"
    ctx.font = "30px Arial"

    ctx.fillText(
      score[0],
      10,
      30
    )

    ctx.fillStyle = "blue"

    ctx.fillText(
      score[1],
      10,
      60
    )
  }


  renderGameStart(ctx, IsOver = 1) {
    this.btnArea = {
      startX: (screenWidth - btnWidth) / 2,
      endX: (screenWidth + btnWidth) / 2,
      startY: this.hPos + this.data.N * rowHeight,
      endY: this.hPos + this.data.N * rowHeight + btnHeight
    }
    ctx.fillStyle = "white"
    ctx.font = "30px Arial"
    if (IsOver == 1) {
      ctx.fillText(
        "Restart",
        screenWidth / 2 - 50,
        this.btnArea.endY
      )
    } else {
      ctx.fillText(
        "Start",
        screenWidth / 2 - 30,
        this.btnArea.endY
      )
    }
  }
  renderGameOver(ctx, IsOver = 1) {
    ctx.fillStyle = "rgba(132,112,255, 0.7)"
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fill()

    ctx.fillStyle = "#ffaaaa"
    ctx.font = "30px Arial"
    ctx.fillText(
      "Rules",
      screenWidth / 2 - 30,
      100
    )
    ctx.fillStyle = "#ffaaaa"
    ctx.font = "15px Arial"

    var text = ["选择一行放置红色棋子，AI会放置蓝色棋子", "除非仅剩一列，不能放在对方刚放置的列上", "任何两列高度差不能超过3", "有横向或斜向n相连同色棋子，得分(n-1)^3", "最终得分为红方减蓝方","看不懂没关系，玩着就懂"]
    for (var i = 0; i < text.length; i++) {
      ctx.fillText(
        text[i],
        (screenWidth - ruleWidth) / 2,
        150 + i * 30,
        ruleWidth
      )
    }



    ctx.fillStyle = "white"
    ctx.font = "30px Arial"
    if (IsOver == 1) {
      ctx.fillText(
        "Final : " + (this.data.score[0] - this.data.score[1]),
        screenWidth / 2 - 60,
        150 + text.length * 30
      )
      /*ctx.fillText(
        "Heightest : " + (this.data.heightset),
        screenWidth / 2 - 90,
        screenHeight - 170
      )*/
    }
  }
  
  renderTip(ctx, text) {
    ctx.fillStyle = "yellow"
    ctx.font = "30px Arial"
    ctx.fillText(
      text,
      screenWidth / 2 - 80,
      this.hPos - 10
    )
  }


  renderGameMap(ctx, main){
    for (var i = 0; i < main.data.M; i++) {

      for (var j = 0; j < main.data.N; j++) {
        if (main.data.top[i] <= j) {
          ctx.fillStyle = "gray"
        } else if (main.data.map[j][i] == 0) {
          ctx.fillStyle = "red"
        } else {
          ctx.fillStyle = "blue"
        }

        ctx.beginPath()
        let x = this.wPos + i * colWidth
        let y = this.hPos + (main.data.N - j - 1) * rowHeight
        ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
    }
  }
}