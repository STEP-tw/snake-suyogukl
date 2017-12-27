let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;

const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(isSelfCollision()==true)return alert('game over');
  if(head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(food);
  }
}
const getPos=function(position){
  return new String(position.x,position.y);
}
// const gameDraw=function(){
//
// }

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();

  snake=new Snake(head,body);
}

const createFood=function(numberOfRows,numberOfCols) {
  food=generateRandomPosition(numberOfCols,numberOfRows);
}
const isSelfCollision=function(){
  let posOfHead=new String(snake.head.x,snake.head.y);
  console.log(posOfBody);
  let posOfBody=snake.body.map(getPos);
  console.log(posOfHead);
  if(posOfBody.includes(posOfHead))return true;
  return false;
}
// const isCollisionWithWall=function(){
//   if(snake.head.x==0||snake.head.y=60)return true;
//   if(snake.head.y=0||snake.head.x=120)return true;
//   return false;
// }

const startGame=function() {
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(food);
  addKeyListener();
  animator=setInterval(animateSnake,500);
}

window.onload=startGame;
