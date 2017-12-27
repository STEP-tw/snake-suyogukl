let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;

const gameDraw=function(){
  alert('game over');
  clearInterval(animateSnake);
  let reset=document.getElementById("reset_game");
  let button=document.createElement('button');
  button.innerHTML='restart';
  reset.appendChild(button);
  button.addEventListener('click',()=>{
    startGame();
  });
}
const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(isSelfCollision()==true||isCollisionWithWall()==true) return gameDraw()
  if(head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(food);
  }
}
const getPos=function(position){
  return `${position.x},${position.y}`
}


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
  let posOfHead=`${snake.head.x},${snake.head.y}`;
  let posOfBody=snake.body.map(getPos);
  return posOfBody.includes(posOfHead)
}
const isCollisionWithWall=function(){
  let xEnds=[-1,numberOfCols];
  let yEnds=[0,numberOfRows];
  return xEnds.includes(snake.head.x)||yEnds.includes(snake.head.y);
}

const startGame=function() {
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(food);
  addKeyListener();
  animator=setInterval(animateSnake,60);
}

window.onload=startGame;
