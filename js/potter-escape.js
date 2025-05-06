const map = document.querySelector(".map");
const harry = document.querySelector(".harry");
const spider = document.querySelector(".spider");
const dementor = document.querySelector(".dementor");
const scoreText = document.querySelector(".score");
const startButton = document.querySelector(".start_button");
const playAgainButton = document.querySelector(".play_again_button"); // Play Again button
const resetButton = document.querySelector(".reset_button"); // Reset button
const maps = document.querySelector(".maps");

let gameInterval;
let isJumping = false;
let position = 50; // harry position
let score = 0;
let speed = 10;
let obstacles = ["spider", "dementor"];
let obstaclePosition = 550;
let nextObstacle = obstacles[Math.floor(Math.random() * obstacles.length)];
let backgroundPosition = 0;

function handleKeyDown(event) {
  if (event.code === "Enter") {
    if (!isJumping) {
      isJumping = true;

      let upInterval = setInterval(() => {
        if (position >= 200) {
          clearInterval(upInterval);

          // down
          let downInterval = setInterval(() => {
            if (position <= 50) {
              clearInterval(downInterval);
              isJumping = false;
            } else {
              position -= 10;
              harry.style.bottom = position + "px";
            }
          }, 20);
        } else {
          position += 10;
          harry.style.bottom = position + "px";
        }
      }, 20);
    }
  }
  // Log Harry's position each time he jumps
  console.log(`Harry's position: ${position}px`);
}

function updateObstaclePosition() {
  obstaclePosition -= speed;
  if (nextObstacle === "spider") {
    spider.style.right = 550 - obstaclePosition + "px";
  } else if (nextObstacle === "dementor") {
    dementor.style.right = 550 - obstaclePosition + "px";
  }
  // Log the position of the obstacle each time it's updated
  console.log(`${nextObstacle} position: ${obstaclePosition}px`);
}

function moveBackground() {
  backgroundPosition -= speed;
  maps.forEach((map.style.left = backgroundPosition + "px"));
  if (backgroundPosition <= -500) backgroundPosition += 500;
}

function updateScore() {
  scoreText.innerHTML = `Score : ${score}`;
}

function checkAvoid() {
  if (obstaclePosition < -30) {
    obstaclePosition = 1000; // reset to full width of two maps
    score++;
    updateScore();
    speed += 0.5;
    nextObstacle = obstacles[Math.floor(Math.random() * obstacles.length)];
  }

  // End the game if the score reaches 10
  if (score >= 10) {
    console.log("You reached 10 points! Game over.");
    gameOver();
    playAgainButton.style.display = "block"; // Show the play again button
    resetButton.style.display = "none"; // Hide the reset button
  }

  console.log(`${nextObstacle} avoided! Score: ${score}`);
}

function gameOver() {
  clearInterval(gameInterval);
  startButton.style.display = "block";
  document.removeEventListener("keydown", handleKeyDown); // Remove keydown listener
}

// Add an event listener to the play again button
playAgainButton.addEventListener("click", () => {
  location.reload(); // Reload the page to reset the game
});

// Add an event listener to the reset button
resetButton.addEventListener("click", () => {
  clearInterval(gameInterval); // Stop the game loop
  gameInit(); // Reinitialize the game state
  resetButton.style.display = "none"; // Hide the Reset button
  startButton.style.display = "block"; // Show the Start button
  playAgainButton.style.display = "none"; // Hide the Play Again button
  document.removeEventListener("keydown", handleKeyDown); // Remove keydown listener
});

function checkObstacleCollision() {
  if (nextObstacle === "spider") {
    if (obstaclePosition < 380 && obstaclePosition > 180 && position < 380) {
      console.log(
        `Collision with ${nextObstacle} at position ${position}px! Game over.`
      );
      gameOver();
    }
  } else if (nextObstacle === "dementor") {
    if (obstaclePosition < 280 && obstaclePosition > 80 && position > 280) {
      console.log(
        `Collision with ${nextObstacle} at position ${position}px! Game over.`
      );
      gameOver();
    }
  }
}

// initGame
function gameInit() {
  obstaclePosition = 550;
  spider.style.right = "-55px";
  dementor.style.right = "-50px";
  score = 0;
  updateScore();
  speed = 10;
}

startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  resetButton.style.display = "block"; // Show the Reset button when the game starts
  gameInit();

  gameInterval = setInterval(() => {
    updateObstaclePosition();
    checkAvoid();
    moveBackground();
    checkObstacleCollision();
  }, 20);

  document.addEventListener("keydown", handleKeyDown);
});

// Autoplay audio when the page loads
window.addEventListener("load", function () {
  let audioFrame = document.querySelector("iframe");
  audioFrame.src += "&autoplay=1";
});
