class Circle {
  x = 200;
  y = 400;
  size = 20;
  directionX = 1;
  directionY = -1;
  velocityX = 8;
  velocityY = 8;

  move() {
    this.x += this.velocityX * this.directionX;
    this.y += this.velocityY * this.directionY;
  }

  getTop() {
    return this.y - this.size / 2;
  }

  getBottom() {
    return this.y + this.size / 2;
  }

  getRight() {
    return this.x + this.size / 2;
  }

  getLeft() {
    return this.x - this.size / 2;
  }

  turnXDirection() {
    this.directionX *= -1;
  }

  turnYDirection() {
    this.directionY *= -1;
  }

  draw() {
    ellipse(this.x, this.y, this.size, this.size);
  }
}

class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  getTop() {
    return this.y;
  }

  getBottom() {
    return this.y + this.height;
  }

  getRight() {
    return this.x + this.width;
  }

  getLeft() {
    return this.x;
  }

  draw() {
    rect(this.x, this.y, this.width, this.height);
  }
}

class Paddle extends Rectangle {
  velocityX = 15;

  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  moveRight() {
    this.x += this.velocityX;
  }

  moveLeft() {
    this.x -= this.velocityX;
  }
}

class Brick extends Rectangle {
  isDestroyed = false;
}

const brickColumns = 4;
const brickRows = 14;
const brickGap = 5;
const brickWidth = 50;
const brickHeight = 20;

function loadRectangles() {
  const bricks = [];

  for (let c = 0; c < brickColumns; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRows; r++) {
      const x = r * (brickWidth + brickGap);
      const y = c * (brickHeight + brickGap);
      bricks[c][r] = new Brick(x, y, brickWidth, brickHeight);
    }
  }

  return bricks;
}

function drawBricks(inputBricks) {
  for (let c = 0; c < brickColumns; c++) {
    for (let r = 0; r < brickRows; r++) {
      if (inputBricks[c][r].isDestroyed) continue;
      inputBricks[c][r].draw();
    }
  }
}

let circleObj;
let paddle;
let bricks = loadRectangles();

function checkBricksCollisions(inputBricks) {
  for (let c = 0; c < brickColumns; c++) {
    for (let r = 0; r < brickRows; r++) {
      const currentBrick = inputBricks[c][r];

      if (currentBrick.isDestroyed) continue;

      checkBallCollisionWithRectangle({
        ball: circleObj,
        rectangle: currentBrick,
        onLeft: () => {
          circleObj.turnXDirection();
          currentBrick.isDestroyed = true;
        },
        onRight: () => {
          circleObj.turnXDirection();
          currentBrick.isDestroyed = true;
        },
        onTop: () => {
          circleObj.turnYDirection();
          currentBrick.isDestroyed = true;
        },
        onBottom: () => {
          circleObj.turnYDirection();
          currentBrick.isDestroyed = true;
        },
      });
    }
  }
}

function checkBallCollisionWithRectangle({
  ball,
  rectangle,
  onTop,
  onRight,
  onBottom,
  onLeft,
}) {
  const isCollisioningTop =
    ball.getBottom() > rectangle.getTop() &&
    ball.getBottom() < rectangle.getTop() + rectangle.height / 2 &&
    ball.x > rectangle.getLeft() &&
    ball.x < rectangle.getRight();

  if (isCollisioningTop) return onTop();

  const isCollisioningBottom =
    ball.getTop() < rectangle.getBottom() &&
    ball.getTop() > rectangle.getTop() + rectangle.height / 2 &&
    ball.x > rectangle.getLeft() &&
    ball.x < rectangle.getRight();

  if (isCollisioningBottom) return onBottom();

  const isCollisioningLeft =
    ball.getRight() > rectangle.getLeft() &&
    ball.getRight() < rectangle.getLeft() + rectangle.width / 2 &&
    ball.y > rectangle.getTop() &&
    ball.y < rectangle.getBottom();

  if (isCollisioningLeft) return onLeft();

  const isCollisioningRight =
    ball.getLeft() < rectangle.getRight() &&
    ball.getLeft() > rectangle.getLeft() + rectangle.width / 2 &&
    ball.y > rectangle.getTop() &&
    ball.y < rectangle.getBottom();

  if (isCollisioningRight) return onRight();
}

function setup() {
  createCanvas(800, 600);
  circleObj = new Circle();
  paddle = new Paddle(width * 0.5 - 100, height * 0.9, 200, 20);
}

function draw() {
  background(240);

  if (circleObj.getRight() > width) {
    circleObj.x = width - circleObj.size / 2 - 1;
    circleObj.turnXDirection();
  }

  if (circleObj.getLeft() < 0) {
    circleObj.x = 0 + circleObj.size / 2;
    circleObj.turnXDirection();
  }

  if (circleObj.getTop() < 0) {
    circleObj.y = 0 + circleObj.size / 2;
    circleObj.turnYDirection();
  }

  checkBallCollisionWithRectangle({
    ball: circleObj,
    rectangle: paddle,
    onLeft: () => circleObj.turnXDirection(),
    onRight: () => circleObj.turnXDirection(),
    onTop: () => circleObj.turnYDirection(),
    onBottom: () => circleObj.turnYDirection(),
  });

  if (keyIsPressed) {
    // Rectangle movement
    if (key.toLowerCase() === "a" && !(paddle.getLeft() < 0)) paddle.moveLeft();
    if (key.toLowerCase() === "d" && !(paddle.getRight() > width))
      paddle.moveRight();
  }

  checkBricksCollisions(bricks);

  circleObj.draw();
  circleObj.move();
  paddle.draw();
  drawBricks(bricks);
}
