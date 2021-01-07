
/** DOM container */
const gameContainer = document.getElementById("game");
/** 2d context, which we use for drawing */
const ctx = gameContainer.getContext("2d");

/** groung image */
const ground = new Image();
ground.src = "img/ground.png";

/** food image */
const foodImg = new Image();
foodImg.src = "img/food.png";

/** size of 1 box element in px */
const box = 32;

/** users score */
let score = 0;

/** coordinates for food image */
let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box,
};

/** coordinates for snake */
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

/** current direction */
let dir;

/**
 * Give keydown event and change current direction.
 * @param {KeyboardEvent} event - keydown event.
 * @return {undefined}
 */
const direction = (event) => {
  if(event.key === 'ArrowLeft' && dir !== "right")
    dir = "left";
  else if(event.key === 'ArrowUp' && dir !== "down")
    dir = "up";
  else if(event.key === 'ArrowRight' && dir !== "left")
    dir = "right";
  else if(event.key === 'ArrowDown' && dir !== "up")
    dir = "down";
}

document.addEventListener("keydown", direction);

/**
 * Сheck that the snake has not eaten itself. Stop the game if she ate her tail.
 * @param {{x: number, y: number}} head - coordinates of snake head.
 * @param {{x: number, y: number}[]} arr - coordinates of snake tail.
 * @return {undefined}
 */
const checkEatTail = (head, arr) => {
  for(let i = 0; i < arr.length; i++) {
    if(head.x == arr[i].x && head.y == arr[i].y)
      clearInterval(game);
  }
}

/**
 * Main function which render all entities
 * @return {undefined}
 */
const drawGame = () => {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "red";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText(score, box * 2.5, box * 1.7);

  /** current location of snake head in X coordinate*/
  let snakeX = snake[0].x;
  /** current location of snake head in Y coordinate*/
  let snakeY = snake[0].y;

  if(snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box,
    };
  } else {
    snake.pop();
  }

  if(snakeX < box || snakeX > box * 17
    || snakeY < 3 * box || snakeY > box * 17)
    clearInterval(game);

  if(dir == "left") snakeX -= box;
  if(dir == "right") snakeX += box;
  if(dir == "up") snakeY -= box;
  if(dir == "down") snakeY += box;

  /** coordinates for new snake head */
  let newHead = {
    x: snakeX,
    y: snakeY
  };

  checkEatTail(newHead, snake);

  snake.unshift(newHead);
}

/** timerId to stop the game */
let game = setInterval(drawGame, 100);
