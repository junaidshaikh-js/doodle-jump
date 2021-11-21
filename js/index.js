window.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector(".grid");
  const doodler = document.createElement("div");

  let doodlerBottomSpace = 150;
  let doodlerLeftSpace = 50;
  let platformCount = 5;
  let platforms = [];
  let isGameOver = false;
  let jumpTimerId;
  let fallTimerId;

  function createDoodler() {
    grid.append(doodler);
    doodler.classList.add("doodler");
    doodler.style.bottom = doodlerBottomSpace + "px";
    doodler.style.left = platforms[0].left + "px";
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
      console.log(platforms);
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

    jumpTimerId = setInterval(() => {
      doodlerBottomSpace += 5;
      doodler.style.bottom = doodlerBottomSpace + "px";

      if (doodlerBottomSpace > 350) {
        fall();
      }
    }, 30);
  }

  function fall() {
    clearInterval(jumpTimerId);

    fallTimerId = setInterval(() => {
      doodlerBottomSpace -= 5;
      doodler.style.bottom = doodlerBottomSpace + "px";

      if (doodlerBottomSpace <= 0) {
        gameOver();
      }
    }, 30);
  }

  function gameOver() {
    isGameOver = true;
    clearInterval(jumpTimerId);
    clearInterval(fallTimerId);
  }

  function start() {
    if (!isGameOver) {
      createPlatform();
      createDoodler();
      setInterval(movePlatforms, 30);
      jump();
    }
  }

  // attach to the button
  start();
});
