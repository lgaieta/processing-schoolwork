float initialPointX;
float initialPointY;
int counterX;
int directionX = 1;
float leftLimitX;
float rightLimitX;

float getY (float x, float r, float h, float k) {
  return (float) Math.sqrt(r * r - Math.pow(x - h, 2)) + k;
}

void setup() {
  size(900, 600);
  
  initialPointX = width * 0.5;
  initialPointY = height * 0.1;

  leftLimitX = width * 0.2;
  rightLimitX = width * 0.8;
  counterX = (int) leftLimitX;
}


void draw() {
  background(255);
  
  boolean hasToBounceX = counterX < leftLimitX || counterX > rightLimitX;
  
  strokeWeight(3);
  if (hasToBounceX) {
    directionX *= -1;
  }

  line(initialPointX, initialPointY, counterX, getY(counterX, height * 0.8, initialPointX, initialPointY));

  counterX += 9 * directionX;
}
