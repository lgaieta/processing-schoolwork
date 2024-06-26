let initialPointX;
let initialPointY;
let counterX;
let directionX = 1;
let leftLimitX;
let rightLimitX;

function getY (x, r, h, k) {
  return Math.sqrt(r * r - Math.pow(x - h, 2)) + k;
}

function setup() {
  createCanvas(900, 600);
  
  initialPointX = width * 0.5;
  initialPointY = height * 0.1;

  leftLimitX = width * 0.2;
  rightLimitX = width * 0.8;
  counterX = leftLimitX;
}


function draw() {
  background(255);
  
  const hasToBounceX = counterX < leftLimitX || counterX > rightLimitX;
  
  strokeWeight(3);
  
  if (hasToBounceX) {
    directionX *= -1;
  }

  line(initialPointX, initialPointY, counterX, getY(counterX, height * 0.8, initialPointX, initialPointY));
  ellipse(counterX, getY(counterX, height * 0.8, initialPointX, initialPointY), 40, 40);

  counterX += 9 * directionX;
}
