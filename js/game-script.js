const snakeboard = document.getElementById("game-canvas")
const snakeboardCtx = snakeboard.getContext('2d')
let dx = 10
let dy = 0

const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

let snake = [  {x: 200, y: 200},
  {x: 190, y: 200},
  {x: 180, y: 200},
  {x: 170, y: 200},
  {x: 160, y: 200},];

function drawSnakePart(snakePart) 
{  
  snakeboardCtx.fillStyle = 'lightblue';  
  snakeboardCtx.strokestyle = 'darkblue';
  snakeboardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);  
  snakeboardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function clearCanvas() {
  //  Select the colour to fill the drawing
  snakeboardCtx.fillStyle = board_background;
  //  Select the colour for the border of the canvas
  snakeboardCtx.strokestyle = board_border;
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

function main() {
  setTimeout(function onTick() {
    clearCanvas()
    move_snake()
    drawSnake()
    main()
    console.log('hello')
  }, 100)
}

function move_snake() 
{  
  const head = {x: snake[0].x + dx, y: snake[0].y};
  snake.unshift(head);
  snake.pop();
}
