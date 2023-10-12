document.addEventListener("DOMContentLoaded", () => {
  const dino = document.querySelector(".dino");
  const startKey = document.querySelector(".start");
  const runnerContainer = document.querySelector(".runner__container");
  const score = document.getElementById('score')
  const highScore = document.getElementById('high')
  let isJumping = false;
  let jumpHeight = 0;
  let gameOver = false;
  let lastCactusTime = 0;
  const minGap = 700;
  const maxRandomDelay = 2000;
  let number = 0;
  let timeCounting;

  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 32 && !isJumping && !gameOver) {
      startKey.style.display = "none";
      jump();
      createCactus();
    }
  });

  function jump() {
    isJumping = true;
    jumpHeight = 120;
    let jumpInterval = setInterval(() => {
      if (jumpHeight === 0) {
        clearInterval(jumpInterval);
        isJumping = false;
      }
      dino.style.bottom = jumpHeight + "px";
      jumpHeight -= 1;
    }, 1);
  }

  function createCactus() {
    if (!gameOver) {
      const currentTime = new Date().getTime();
      if (currentTime - lastCactusTime > minGap) {
        const cactus = document.createElement("img");
        cactus.src = "./image/cactus.png";
        cactus.classList.add("cactus");
        runnerContainer.appendChild(cactus);
        cactus.style.left = "800px";

        lastCactusTime = currentTime;

        if (!timeCounting) {
          timeCounting = setInterval(() => {
            number ++ ;
            score.innerHTML = number
            console.log(number);
          }, 100);
        }

        const moveCactus = () => {
          if (!gameOver) {
            const cactusPosition = parseInt(cactus.style.left, 10);
            if (cactusPosition > -60) {
              cactus.style.left = cactusPosition - 4 + "px";
              requestAnimationFrame(moveCactus);
            } else {
              runnerContainer.removeChild(cactus);
            }

            if (cactusPosition > 0 && cactusPosition < 45 && jumpHeight < 35) {
              highScore.innerHTML = number
              console.log('GAME OVER')
              gameOver = true;
              clearInterval(timeCounting);
            }
          }
        };

        moveCactus();
      }

      setTimeout(createCactus, Math.random() * maxRandomDelay + 1000);
    }
  }
});
