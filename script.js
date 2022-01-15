window.onload = function () {
  canv = document.getElementById("gc");
  ctx = canv.getContext("2d");
  document.addEventListener("keydown", keyPush);
  setInterval(game, 1000 / 15);
  livesPanel = document.getElementById("lives");
};
px = py = 10;
gs = tc = 20;
ax = ay = 15;
xv = yv = 0;
trail = [];
tail = 5;
moves = 25;
hits = 0;
lives = 3;
gameOver = false;

function game() {
  livesPanel.value = lives;
  document.getElementById("lives").innerHTML = lives;
  document.getElementById("moves").innerHTML = moves;
  document.getElementById("hits").innerHTML = hits;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canv.width, canv.height);
  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, canv.width, canv.height);
  } else {
    px += xv;
    py += yv;
    // Wraparound in X and Y
    if (px < 0) {
      px = tc - 1;
    }
    if (px > tc - 1) {
      px = 0;
    }
    if (py < 0) {
      py = tc - 1;
    }
    if (py > tc - 1) {
      py = 0;
    }

    ctx.fillStyle = "pink";
    for (var i = 0; i < trail.length; i++) {
      ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
      if (trail[i].x == px && trail[i].y == py) {
        tail = 5;
      }
    }
    trail.push({ x: px, y: py });
    while (trail.length > tail) {
      trail.shift();
    }
    if (ax == px && ay == py) {
      tail++;
      ax = Math.floor(Math.random() * tc);
      ay = Math.floor(Math.random() * tc);
      hits++;
    } else {
    }
    ctx.fillStyle = "red";
    ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
  }
}

function keyPush(evt) {
  switch (evt.keyCode) {
    case 37:
      xv = -1;
      yv = 0;
      break;
    case 38:
      xv = 0;
      yv = -1;
      break;
    case 39:
      xv = 1;
      yv = 0;
      break;
    case 40:
      xv = 0;
      yv = 1;
      break;
    case 13:
      lives = 3;
      moves = 25;
      gameOver = true;
  }
  moves--;
  if (moves == 0) {
    lives--;
    moves = 25;
  }
  if (lives == 0) {
    gameOver = True;
  }
}
