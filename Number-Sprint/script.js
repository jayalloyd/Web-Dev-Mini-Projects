let grid = document.getElementById("grid");
let timerDisplay = document.getElementById("timer");
let msg = document.getElementById("message");
let restartBtn = document.getElementById("restart");

let numbers = [];
let nextNum = 1;
let startTime, timerInterval;

function setupGrid() {
  grid.innerHTML = "";
  numbers = Array.from({ length: 25 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
  numbers.forEach(num => {
    let cell = document.createElement("div");
    cell.textContent = num;
    cell.addEventListener("click", () => handleClick(num, cell));
    grid.appendChild(cell);
  });
  nextNum = 1;
  timerDisplay.textContent = "00:00.000";
  msg.textContent = "Click 1 to start";
}

function handleClick(num, cell) {
  if (num === nextNum) {
    cell.classList.add("correct");

    if (num === 1) startTimer();
    if (num === 25) {
      stopTimer();
      showPopup();
      return;
    }
    nextNum++;
  }
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    let elapsed = Date.now() - startTime;
    timerDisplay.textContent = formatTime(elapsed);
  }, 10);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function formatTime(ms) {
  let sec = Math.floor(ms / 1000);
  let min = Math.floor(sec / 60);
  sec = sec % 60;
  let milli = ms % 1000;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${String(milli).padStart(3, "0")}`;
}

function showPopup() {
  let finalTime = timerDisplay.textContent;

  let popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `
    <div class="popup-content">
      <h2>🏁 You Finished!</h2>
      <p>Your Time: <strong>${finalTime}</strong></p>
      <button id="closePopup">Play Again</button>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById("closePopup").onclick = () => {
    popup.remove();
    setupGrid();
  };
}

restartBtn.addEventListener("click", setupGrid);
setupGrid();
