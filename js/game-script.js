const snakeboard = document.getElementById("game-canvas")
const snakeboardCtx = snakeboard.getContext('2d')
const resetButton = document.getElementById('reset-button')
resetButton.style.visibility = "hidden"
let gameEnded = false
// let changingDirections = false
let dx = 10
let dy = 0
let score = 0

let food_x
let food_y

const boardBorder = 'black';
const boardBackground = 'white';
const snakeCol = 'lightblue';
const snakeBorder = 'darkblue';

let snake = [  {x: 200, y: 200},
  {x: 190, y: 200},
  {x: 180, y: 200},
  {x: 170, y: 200},
  {x: 160, y: 200},];

document.addEventListener("keydown", changeDirection)


function main() {
  if (checkifGameEnded()){
    resetButton.style.visibility = "visible"
    return
  }
  setTimeout(function onTick() {
    clearCanvas()
    drawFood()
    moveSnake()
    drawSnake()
    main()
   }, 100)
}

function resetSnake() {
  snake = [  {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200},];
}

function clearCanvas() {
  //  Select the colour to fill the drawing
  snakeboardCtx.fillStyle = boardBackground;
  //  Select the colour for the border of the canvas
  snakeboardCtx.strokestyle = boardBorder;
  // Draw a "filled" rectangle to cover the entire canvas
  snakeboardCtx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  // Draw a "border" around the entire canvas
  snakeboardCtx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

/*Function that prints the parts*/
function drawSnake() 
{  
  snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) 
{  
  snakeboardCtx.fillStyle = snakeCol;  
  snakeboardCtx.strokestyle = snakeBorder;
  snakeboardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);  
  snakeboardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
 
function moveSnake() 
{  
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
      if (has_eaten_food) {
        // Generate new food location
        genFood();
        score += 10
        document.getElementById('score-counter').innerHTML = score
      } else {
        // Remove the last part of snake body
        snake.pop();
      }
}

function changeDirection(event) 
{  
   const LEFT_KEY = 37;
   const RIGHT_KEY = 39;
   const UP_KEY = 38;
   const DOWN_KEY = 40;
 
   const keyPressed = event.keyCode;
   const goingUp = dy === -10;
   const goingDown = dy === 10;
   const goingRight = dx === 10;  
   const goingLeft = dx === -10;
 
     if (keyPressed === LEFT_KEY && !goingRight)
     {    
          dx = -10;
          dy = 0;  
     }
 
     if (keyPressed === UP_KEY && !goingDown)
     {    
          dx = 0;
          dy = -10;
     }
 
     if (keyPressed === RIGHT_KEY && !goingLeft)
     {    
          dx = 10;
          dy = 0;
     }
 
     if (keyPressed === DOWN_KEY && !goingUp)
     {    
          dx = 0;
          dy = 10;
     }
}

function checkifGameEnded()
{  
  for (let i = 4; i < snake.length; i++)
  {    
    const hasCollided = snake[i].x === snake[0].x && snake[i].y === snake[0].y
    if (hasCollided) 
      return true
  }
  const hitLeftWall = snake[0].x < 0;  
  const hitRightWall = snake[0].x > snakeboard.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeboard.height - 10;


  return hitLeftWall ||  hitRightWall || hitToptWall || hitBottomWall
}

function randomFood(min, max)
{  
   return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}
 
function genFood() 
{  
   food_x = randomFood(0, snakeboard.width - 10);
   food_y = randomFood(0, snakeboard.height - 10);
   snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) genFood();
      });
}

function drawFood()
{
      snakeboardCtx.fillStyle = 'lightgreen';
      snakeboardCtx.strokestyle = 'darkgreen';
      snakeboardCtx.fillRect(food_x, food_y, 10, 10);
      snakeboardCtx.strokeRect(food_x, food_y, 10, 10);
}
