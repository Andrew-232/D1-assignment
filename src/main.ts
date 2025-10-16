let counter: number = 0;

let upgrade1Count: number = 0;
const upgrade1Cost: number = 10;

let upgrade2Count: number = 0;
const upgrade2Cost: number = 50;

let upgrade3Count: number = 0;
const upgrade3Cost: number = 100;

document.body.innerHTML = `
  <h1>Clicker Game</h1>
  <p>Counter: <span id="counter">0</span></p>
  <p>Clicks per second: <span id="cpsDisplay">0</span></p>
  <hr/>
  <p>Auto Clickers Level 1 Bought: <span id="growthRateDisplay">0</span></p>
  <p><button id="increment">Manuel Clicker Button!</button></p>
  <p><button id="purchaseUpgrade" disabled>Auto Clicker 1 Upgrade (Cost: ${upgrade1Cost})</button></p>
  <p>Auto Clickers Level 2 Bought: <span id="autoClicker5Display">0</span></p>
  <button id="purchaseAutoClicker5" disabled>Auto Clicker 2 Upgrade (Cost: ${upgrade2Cost})</button>
  <p>Auto Clickers Level 3 Bought: <span id="autoClicker20Display">0</span></p>
  <button id="purchaseAutoClicker20" disabled>Auto Clicker 3 Upgrade (Cost: ${upgrade3Cost})</button>
`;

document.body.style.backgroundColor = "lightgrey";

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const cpsDisplayElement = document.getElementById("cpsDisplay")!; // New element

const purchaseUpgradeButton = document.getElementById(
  "purchaseUpgrade",
) as HTMLButtonElement;
const growthRateDisplay = document.getElementById("growthRateDisplay")!;

const purchaseAutoClicker5Button = document.getElementById(
  "purchaseAutoClicker5",
) as HTMLButtonElement;
const autoClicker5Display = document.getElementById("autoClicker5Display")!;

const purchaseAutoClicker20Button = document.getElementById(
  "purchaseAutoClicker20",
) as HTMLButtonElement;
const autoClicker20Display = document.getElementById("autoClicker20Display")!;

// Event Listeners
button.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();
});

purchaseUpgradeButton.addEventListener("click", () => {
  if (counter >= upgrade1Cost) {
    counter -= upgrade1Cost;
    upgrade1Count++;
    growthRateDisplay.textContent = upgrade1Count.toString();
  }
});

purchaseAutoClicker5Button.addEventListener("click", () => {
  if (counter >= upgrade2Cost) {
    counter -= upgrade2Cost;
    upgrade2Count++;
    autoClicker5Display.textContent = upgrade2Count.toString();
  }
});

purchaseAutoClicker20Button.addEventListener("click", () => {
  if (counter >= upgrade3Cost) {
    counter -= upgrade3Cost;
    upgrade3Count++;
    autoClicker20Display.textContent = upgrade3Count.toString();
  }
});

// Game Loop
let lastTime: number = 0;

function gameLoop(timestamp: number) {
  if (lastTime === 0) {
    lastTime = timestamp;
    requestAnimationFrame(gameLoop);
    return;
  }

  const deltaTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  const totalGrowthPerSecond = upgrade1Count * 1 + upgrade2Count * 5 +
    upgrade3Count * 20;

  counter += totalGrowthPerSecond * deltaTime;

  counterElement.textContent = Math.floor(counter).toString();
  cpsDisplayElement.textContent = totalGrowthPerSecond.toString(); // Update the new stat

  purchaseUpgradeButton.disabled = counter < upgrade1Cost;
  purchaseAutoClicker5Button.disabled = counter < upgrade2Cost;
  purchaseAutoClicker20Button.disabled = counter < upgrade3Cost;

  requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
