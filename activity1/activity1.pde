void setup() {
  size(900, 600);
}

void draw() {
  background(255);
  
  fill(random(255), random(255), random(255));
  rect(width * 0.5 - 50, height * 0.5 - 25, 100, 50);
  
  delay(2000);
}
