let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;

const gameDraw=function(){
  clearInterval(animator);
  let restart=document.getElementById("reset_game");
  restart.style.visibility='visible';
  restart.addEventListener('click',()=>{
    location.reload();
  });
}
const setNewTag=function(element,tagName,textContent){
  let createNewElement=document.createElement(tagName);
  createNewElement.innerHTML=textContent;
  element.appendChild(createNewElement);
}
const createRestartButton=function(){
  let reset=document.getElementById("reset_game");
  setNewTag(reset,'h1','Game Over');
  setNewTag(reset,'button','restart');
  reset.style.visibility='hidden';
}
const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(snake.isSnakeEatItself()||snake.isSnakeTouchWall()) {
    return gameDraw();
  };
  if(head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(food);
  }
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

const startGame=function() {
  drawGrids(numberOfRows,numberOfCols);
  createSnake();
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(food);
  addKeyListener();
  createRestartButton();
  animator=setInterval(animateSnake,60);
}

window.onload=startGame;
