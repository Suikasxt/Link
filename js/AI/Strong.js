import Data from './../data'
const INF = 1e8
var operator

export default class StrongAI {
  constructor(side, deep, type) {
    this.side = side
    this.deep = deep
    this.type = type
  }
  search(deep, Si, bound, type, last) {
    if (deep == 0) {
      this.data.judge(type)
      return this.data.score[Si] - this.data.score[Si ^ 1]
    }
    var dataTmp = new Data()
    dataTmp.copyFrom(this.data)
    var Value = -INF
    var end = 1
    var leftColNumber = this.data.getLeftCol()
    var op
    for (var i = 0; i < this.data.M; i++){
      if (this.data.work(Si, i)){
        end = 0
        var tmp

        tmp = -this.search(deep - 1, Si ^ 1, Value, type);

        this.data.copyFrom(dataTmp)

        if (-tmp <= bound) return tmp;
        if (tmp > Value) {
          Value = tmp;
          op = i;
        }
      }
    }
    operator = op;
    if (end) {
      this.data.judge(type);
      return this.data.score[Si] - this.data.score[Si ^ 1];
    }
    return Value;
  }
  play(dataOriginal) {
    this.data = new Data()
    this.data.copyFrom(JSON.parse(dataOriginal))
    this.search(this.deep + 1, this.side, -INF, this.type)
    return operator
  }
}