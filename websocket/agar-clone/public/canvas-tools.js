function init() {
  draw();
}

player.locX = Math.floor(500 * Math.random() + 100);
player.locY = Math.floor(500 * Math.random() + 100);

function draw() {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);

  const cameraX = -player.locX + canvas.width / 2;
  const cameraY = -player.locY + canvas.height / 2;
  context.translate(cameraX, cameraY);

  context.beginPath();
  context.fillStyle = 'rgb(255, 0, 0)';
  context.arc(player.locX, player.locY, 10, 0, Math.PI * 2);
  context.fill();
  context.lineWidth = 3;
  context.strokeStyle = 'rgb(0, 255, 0)';
  context.stroke();

  orbs.forEach((orb) => {
    context.beginPath();
    context.fillStyle = orb.color;
    context.arc(orb.locX, orb.locY, orb.radius, 0, Math.PI * 2);
    context.fill();
  });

  requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', (event) => {
  const mousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
  const angleDeg = (Math.atan2(mousePosition.y - canvas.height / 2, mousePosition.x - canvas.width / 2) * 180) / Math.PI;
  const speed = 10;

  if (angleDeg >= 0 && angleDeg < 90) {
    xVector = 1 - angleDeg / 90;
    yVector = -(angleDeg / 90);
  } else if (angleDeg >= 90 && angleDeg <= 180) {
    xVector = -(angleDeg - 90) / 90;
    yVector = -(1 - (angleDeg - 90) / 90);
  } else if (angleDeg >= -180 && angleDeg < -90) {
    xVector = (angleDeg + 90) / 90;
    yVector = 1 + (angleDeg + 90) / 90;
  } else if (angleDeg < 0 && angleDeg >= -90) {
    xVector = (angleDeg + 90) / 90;
    yVector = 1 - (angleDeg + 90) / 90;
  }

  if ((player.locX < 5 && player.xVector < 0) || (player.locX > 500 && xVector > 0)) {
    player.locY -= speed * yVector;
  } else if ((player.locY < 5 && yVector > 0) || (player.locY > 500 && yVector < 0)) {
    player.locX += speed * xVector;
  } else {
    player.locX += speed * xVector;
    player.locY -= speed * yVector;
  }
});
