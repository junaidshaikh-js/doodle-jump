window.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector(".grid");
  const doodler = document.createElement("div");

  let startPoint = 150;
  let doodlerBottomSpace = startPoint;
  let doodlerLeftSpace = 50;
  let platformCount = 5;
  let platforms = [];
  let isGameOver = false;
  let isJumping = true;
  let jumpTimerId;
  let fallTimerId;
  let moveLeftTimerId;
  let moveRightTimerId;

  function createDoodler() {
    grid.append(doodler);
    doodler.classList.add("doodler");
    doodlerLeftSpace = platforms[0].left;
    doodler.style.bottom = doodlerBottomSpace + "px";
    doodler.style.left = doodlerLeftSpace + "px";
  }

  class Platform {
    constructor(newPlatformBottom) {
      this.bottom = newPlatformBottom;
      this.left = Math.random() * 320;
      this.visual = document.createElement("div");

      const visual = this.visual;
      visual.style.left = this.left + "px";
      visual.style.bottom = this.bottom + "px";
      visual.classList.add("platform");
      grid.append(visual);
    }
  }

  function createPlatform() {
    for (let i = 0; i < platformCount; i++) {
      let platformGap = 600 / platformCount;
      let newPlatformBottom = 100 + i * platformGap;
      let platform = new Platform(newPlatformBottom);
      platforms.push(platform);
    }
  }

  function movePlatforms() {
    if (doodlerBottomSpace > 200) {
      platforms.forEach((platform) => {
        let visual = platform.visual;
        platform.bottom -= 5;
        visual.style.bottom = platform.bottom + "px";
      });
    }
  }

  function jump() {
    clearInterval(fallTimerId);
    isJumping = true;

    jumpTimerId = setInterval(() => {
      doodlerBottomSpace += 5;
      doodler.style.bottom = doodlerBottomSpace + "px";

      if (doodlerBottomSpace > startPoint + 200) {
        fall();
      }
    }, 30);
  }

  function fall() {
    clearInterval(jumpTimerId);
    isJumping = false;

    fallTimerId = setInterval(() => {
      doodlerBottomSpace -= 5;
      doodler.style.bottom = doodlerBottomSpace + "px";

      if (doodlerBottomSpace <= 0) {
        gameOver();
      }

      platforms.forEach((platform) => {
        if (
          doodlerBottomSpace >= platform.bottom &&
          doodlerBottomSpace <= platform.bottom + 15 &&
          doodlerLeftSpace + 60 >= platform.left &&
          doodlerLeftSpace <= platform.left + 85 &&
          !isJumping
        ) {
          startPoint = doodlerBottomSpace;
          jump();
        }
      });
    }, 30);
  }

  function gameOver() {
    clearInterval(jumpTimerId);
    clearInterval(fallTimerId);
    clearInterval(moveLeftTimerId);
    clearInterval(moveRightTimerId);
    console.log("game over");
    isGameOver = true;
  }

  function control(e) {
    if (e.key == "ArrowLeft") {
      moveLeft();
    } else if (e.key == "ArrowRight") {
      moveRight();
    } else if (e.key == "ArrowUp") {
      moveUp();
    }
  }

  function moveLeft() {
    clearInterval(moveRightTimerId);

    moveLeftTimerId = setInterval(() => {
      if (doodlerLeftSpace >= 0) {
        doodlerLeftSpace -= 5;
        doodler.style.left = doodlerLeftSpace + "px";
      } else {
        moveRight();
      }
    }, 30);
  }

  function moveRight() {
    clearInterval(moveLeftTimerId);

    moveRightTimerId = setInterval(() => {
      if (doodlerLeftSpace + 60 < 400) {
        doodlerLeftSpace += 5;
        doodler.style.left = doodlerLeftSpace + "px";
      } else {
        moveLeft();
      }
    }, 30);
  }

  function moveUp() {
    clearInterval(moveLeftTimerId);
    clearInterval(moveRightTimerId);

    doodlerBottomSpace += 40;
    doodler.style.bottom = doodlerBottomSpace + "px";
  }

  function start() {
    if (!isGameOver) {
      createPlatform();
      createDoodler();
      setInterval(movePlatforms, 30);
      jump();
      document.addEventListener("keyup", control);
    }
  }

  // attach to the button
  start();
});
