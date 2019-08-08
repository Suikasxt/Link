const dirNumber = 3
const dir = [[0, 1], [1, 1], [-1, 1], [1, 0]]

export default class Data {
  constructor(N, M) {
    this.N = N
    this.M = M
    this.reset()
  }
  copyFrom(obj){
    this.N = obj.N
    this.M = obj.M
    this.top = JSON.parse(JSON.stringify(obj.top))
    this.last = JSON.parse(JSON.stringify(obj.last))
    this.map = JSON.parse(JSON.stringify(obj.map))
    this.heightest = obj.heightest
  }

  reset() {
    this.score = [0, 0]
    this.last = [-1, -1]
    this.heightest = -1000
    this.map = new Array(this.N)
    this.top = new Array(this.M)
    for (var i = 0; i < this.N; i++) {
      this.map[i] = new Array(this.M)
      for (var j = 0; j < this.M; j++){
        this.map[i][j] = 0;
      }
    }
    for (var i = 0; i < this.M; i++){
      this.top[i] = 0
    }
  }

  work(side, pos) {
    if (this.getLeftCol() == 0){
      return false
    }
    if (this.top[pos] == this.N){
      return false
    }
    if (this.getLeftCol() > 1 && pos == this.last[side^1]){
      return false
    }
    if (this.top[pos] - this.getMinCol() > 2){
      return false
    }
    this.last[side] = pos
    this.map[this.top[pos]][pos] = side
    this.top[pos]++
    this.judge()
    return true
  }
  
  getLeftCol(){
    let res = 0
    for (var j = 0; j < this.M; j++){
      if (this.top[j] < this.N){
        res++
      }
    }
    return res
  }

  getMinCol(){
    let res = this.N
    for (var i = 0; i < this.M; i++){
      if (res > this.top[i]){
        res = this.top[i]
      }
    }
    return res
  }

  scoreFun(x){
    return x*x*x
  }

  judge(type = 0){
    var tmp = new Array(this.N)
    for (var i = 0; i < this.N; i++){
      tmp[i] = new Array(this.M)
    }

    this.score[0] = this.score[1] = 0
    for (var k = 0; k < dirNumber; k++){
      for (var j = 0; j < this.M; j++){
        for (var i = 0; i < this.top[j]; i++) {
          let x = i - dir[k][0]
          let y = j - dir[k][1]

          if (this.ValidCoord(x, y) && x < this.top[y] && this.map[x][y] == this.map[i][j]) {
            tmp[i][j] = tmp[x][y] + 1;
            this.score[this.map[i][j]] += this.scoreFun(tmp[i][j]) - this.scoreFun(tmp[x][y]);
          } else tmp[i][j] = 0;
        }
      }
    }
    for (var j = 0; j < this.M; j++){
      for (var i = 0; i < this.top[j]; i++) {

        for (var o = -1; o <= 1; o++)
          if (o){
            for (var k = 0; k < dirNumber; k++){
              var x = i, y = j;
              x += o * dir[k][0];
              y += o * dir[k][1];
              if (this.ValidCoord(x, y) && this.top[y] <= x){
                this.score[this.map[i][j]] += type;
              }
            }
          }
      }
    }
  }
  ValidCoord(x, y){
    return (x >= 0) && (y >= 0) && (x < this.N) && (y < this.M)
  }
}
