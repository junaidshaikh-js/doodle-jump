window.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector(".grid");
  let doodlerBottomSpace = 150;
  let doodlerLeftSpace = 50;
  let platformCount = 5;
  let platforms = [];

  function createDoodler() {
    const doodler = document.createElement("div");
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

  function start() {
    createPlatform();
    createDoodler();
  }

  // attach to the button
  start();
});
