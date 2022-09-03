let number = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const disableFieldAndButton = (state) => {
  document.querySelector(".input").disabled = state;
  document.querySelector(".check").disabled = state;
};

const showNumber = (state, color) => {
  if (state) {
    document.querySelector(".guess").textContent = number;
    document.querySelector(".guess").style.width = "15rem";
    document.querySelector("body").style.backgroundColor = color;
  } else {
    document.querySelector(".guess").textContent = "?";
    document.querySelector("body").style.backgroundColor = color;
  }
};

const setContent = (selector, content) => {
  document.querySelector(selector).textContent = content;
};

const resetInput = () => {
  document.querySelector(".input").value = "";
};

document.querySelector(".check").addEventListener("click", function (event) {
  event.preventDefault();
  const guessedNumber = Number(document.querySelector(".input").value);
  if (score > 1 && guessedNumber !== number) {
    if (!guessedNumber) {
      setContent(".message", "🤨 Enter a number...");
    } else if (guessedNumber > 20 || guessedNumber < 1) {
      setContent(".message", "🤨 Enter between 1 and 20...");
    } else if (guessedNumber > number) {
      setContent(".message", "📈 Too High...");
      score--;
    } else if (guessedNumber < number) {
      setContent(".message", "📉 Too Low...");
      score--;
    }
    if (score <= 3) setContent(".scoreText", "😱 Score:");
    else if (score > 3 && score <= 7) setContent(".scoreText", "🤕 Score:");
    else if (score > 7 && score <= 12) setContent(".scoreText", "🤒 Score:");
    else if (score > 12 && score < 15) setContent(".scoreText", "😵‍💫 Score:");
  } else if (guessedNumber === number) {
    setContent(".message", "🎉 Correct Number... ");
    showNumber(true, "rgb(0,255,0,0.95)");
    disableFieldAndButton(true);
    if (score > highscore) {
      highscore = score;
      setContent(".highScore", highscore);
    }
  } else {
    score--;
    setContent(".message", "😭 Game Over...");
    showNumber(false, "rgb(255,0,0,0.8)");
    showNumber(true);
    disableFieldAndButton(true);
  }
  resetInput();
  setContent(".score", score);
});

// Don't needed anymore
// document.querySelector("input").addEventListener("keyup", function (event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     document.querySelector(".check").click();
//   }
// });

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  setContent(".score", score);
  number = Math.trunc(Math.random() * 20) + 1;
  showNumber(false, "rgb(0,0,0,0.9)");
  setContent(".message", "😇 Start Guessing...");
  setContent(".scoreText", "🥳 Score:");
  resetInput();
  disableFieldAndButton(false);
});
