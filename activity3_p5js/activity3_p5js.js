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
  background(255);
}


function draw() {
  const hasToBounceX = counterX < leftLimitX || counterX > rightLimitX;
  
  strokeWeight(12);
  
  if (hasToBounceX) {
    directionX *= -1;
  }
  
  colorMode(HSL);
  
  
  stroke(Math.random() * 360, 100, 50);

  line(initialPointX, initialPointY, counterX, getY(counterX, height * 0.8, initialPointX, initialPointY));

  counterX += 9 * directionX;
}
