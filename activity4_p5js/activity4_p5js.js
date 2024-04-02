function drawL( {
  size, position
}
) {
  const [sizeX, sizeY] = size;
  const [positionX, positionY] = position;

  // Draw vertical line
  line(positionX, positionY, positionX, positionY + sizeY);
  // Draw horizontal line
  line(positionX, positionY + sizeY, positionX + sizeX, positionY + sizeY);
}

function drawA( {
  size, position
}
) {
  const [sizeX, sizeY] = size;
  const [positionX, positionY] = position;
  
  strokeWeight(20);

  // Draw left line
  line(positionX + sizeX / 2, positionY, positionX, positionY + sizeY);
  // Draw right line
  line(positionX + sizeX / 2, positionY, positionX + sizeX, positionY + sizeY);
  // Draw middle line
  line(positionX + sizeX / 4, positionY + sizeY / 2, positionX + sizeX / 4 * 3, positionY + sizeY / 2);
}

function setup() {
  createCanvas(500, 500);
}


function draw() {
  background(250);

  drawL( {
  size:
  [width * 0.2, width * 0.3], position:
    [width * 0.2, height * 0.2]
  }
  );
  drawA( {
  size:
  [width * 0.3, width * 0.3], position:
    [width * 0.5, height * 0.2]
  }
  );
}
