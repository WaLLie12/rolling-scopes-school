document.addEventListener("DOMContentLoaded", () => {
  const dino = document.querySelector(".dino");
  const startKey = document.querySelector(".start");
  const runnerContainer = document.querySelector(".runner__container");
  const points = document.getElementById("score");
  const highScore = document.getElementById("high");
  const finish = document.querySelector(".game__over");
  const result = document.querySelectorAll(".top__result");
  let isJumping = false;
  let jumpHeight = 0;
  let gameOver = false;
  let lastCactusTime = 0;
  const minGap = 700;
  const maxRandomDelay = 2000;
  let number = 0;
  let timeCounting;
  let scoresArr = JSON.parse(localStorage.getItem("scores")) || [];
  console.log(scoresArr);

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

        const moveCactus = () => {
          if (!gameOver) {
            const cactusPosition = parseInt(cactus.style.left, 10);
            if (cactusPosition > -60) {
              cactus.style.left = cactusPosition - 4 + "px";
              requestAnimationFrame(moveCactus);
            } else {
              runnerContainer.removeChild(cactus);
            }
            if (!timeCounting) {
              timeCounting = setInterval(() => {
                number++;
                points.innerHTML = number;
              }, 30);
            }
            if (cactusPosition > 0 && cactusPosition < 45 && jumpHeight < 35) {
              scoresInArr();
              if (number > parseInt(highScore.innerHTML)) {
                highScore.innerHTML = number;
              }
              console.log(scoresArr);
              setTimeout(()=>{
            },100)
              console.log(number);
              gameOver = true;
              clearInterval(timeCounting);
              finish.style.display = "block";
                document.addEventListener("keyup", function (event) {
                  if (event.keyCode === 32 && gameOver) {
                    restartGame();
                  }
                });
            }
          }
        };

        moveCactus();
      }

      setTimeout(createCactus, Math.random() * maxRandomDelay + 1000);
    }
  }

  function restartGame() {
    gameOver = false;
    jumpHeight = 0;
    number = 0;
    timeCounting = setInterval(() => {
      number++;
      points.innerHTML = number;
    }, 30);
    finish.style.display = "none";
    const cacti = document.querySelectorAll(".cactus");
    cacti.forEach((cactus) => cactus.remove());
    createCactus();
  }

  function scoresInArr() {
    scoresArr.push(number);

    if (scoresArr.length > 10) {
      scoresArr.shift();
    }

    localStorage.setItem("scores", JSON.stringify(scoresArr));
  }
})
