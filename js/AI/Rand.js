import Data from './../data'

export default class RandAI {
  constructor(side) {
    this.side = side
  }
  play(dataOriginal) {
    let data = new Data()
    data.copyFrom(JSON.parse(dataOriginal))
    var res = 0
    for (var i = 0; i < data.M; i++) {
      if (data.work(this.side, i) == true) {
        res = i
        break
      }
    }
    data = null
    return res
  }
}