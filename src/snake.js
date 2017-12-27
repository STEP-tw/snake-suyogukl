const Snake=function(head,body) {
  this.head=head;
  this.body=body;
}

Snake.prototype={
  getBody:function() {
    return this.body;
  },
  getHead:function() {
    return this.head;
  },
  isSnakeTouchWall:function(){
    let xEnds=[0,numberOfCols-1];
    let yEnds=[0,numberOfRows-1];
    return xEnds.includes(this.head.x)||yEnds.includes(this.head.y);
  },
  getPos:function(position){
    return `${position.x},${position.y}`
  },
  isSnakeEatItself:function(){
    let posOfHead=`${this.head.x},${this.head.y}`;
    let posOfBody=this.body.map(this.getPos);
    return posOfBody.includes(posOfHead);
  },
  move:function() {
    this.body.push(this.head);
    this.head=this.head.next();
    return this.body.shift();
  },
  grow:function() {
    this.body.unshift(new Position(Infinity,Infinity,this.direction));
  },
  turnLeft:function() {
    this.head=this.head.turnLeft();
  },
  turnRight:function() {
    this.head=this.head.turnRight();
  }
}
