import Data from './data'
import GameMap from './draw'
import StrongAI from './AI/Strong'

let N = 12
let M = 5
let ctx = canvas.getContext('2d')
let AI = new StrongAI(1, 8, 1)

export default class Main {
  constructor() {
    this.init()
  }

  init() {
    this.data = new Data(N, M)
    this.game = new GameMap(this)
    this.game.renderGameOver(ctx, 0)
    this.game.renderGameStart(ctx, 0)
    this.touchHandler = this.touchEventHandler.bind(this)
    canvas.addEventListener('touchstart', this.touchHandler)
    this.stage = 0
  }

  reset() {
    this.data.reset()
    this.redraw()
    this.stage = 1
  }
  
  touchEventHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.game.btnArea

    if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY)
      this.reset()
  }

  redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.game.renderGameScore(ctx, this.data.score)
    this.game.renderGameMap(ctx, this)
    this.game.renderGameStart(ctx)
  }

  setGameOver(){
    this.stage = 3
    this.game.renderGameOver(ctx)
    if (this.data.score[0] - this.data.score[1] > this.data.heightest){
      this.data.heightest = this.data.score[0] - this.data.score[1]
    }
    this.touchHandler = this.touchEventHandler.bind(this)
  }

  player(posY) {
    if (this.stage != 1){
      return;
    }
    if (this.data.work(0, posY)) {
      this.redraw()
      if (this.data.getLeftCol() == 0){
        this.setGameOver()
        return
      }
      this.stage = 2
      this.game.renderTip(ctx, "AI working...")
      var that = this
      setTimeout(function(){that.AI()}, 100)
    } else {
      this.redraw()
      this.game.renderTip(ctx, "Can't be " + posY)
    }
  }

  AI() {
    let pos = AI.play(JSON.stringify(this.data))
    this.data.work(1, pos)
    this.redraw()
    if (this.data.getLeftCol() == 0) {
      this.setGameOver()
      return
    }
    this.stage = 1
    this.game.renderTip(ctx, "")
  }
}
