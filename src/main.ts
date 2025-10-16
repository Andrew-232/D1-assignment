let counter: number = 0;

const costMultiplier: number = 1.15; // 15% increase per purchase

// Upgrade 1
let upgrade1Count: number = 0;
const baseUpgrade1Cost: number = 10;
let currentUpgrade1Cost: number = baseUpgrade1Cost;

// Upgrade 2
let upgrade2Count: number = 0;
const baseUpgrade2Cost: number = 50;
let currentUpgrade2Cost: number = baseUpgrade2Cost;

// Upgrade 3
let upgrade3Count: number = 0;
const baseUpgrade3Cost: number = 100;
let currentUpgrade3Cost: number = baseUpgrade3Cost;

document.body.innerHTML = `
  <h1>Clicker Game</h1>
  <p>Counter: <span id="counter">0</span></p>
  <p>Clicks per second: <span id="cpsDisplay">0</span></p>
  <hr/>
  <p>Auto Clickers Level 1 Bought: <span id="growthRateDisplay">0</span></p>
  <p><button id="increment">Manuel Clicker Button!</button></p>
  <p><button id="purchaseUpgrade" disabled>Auto Clicker 1 Upgrade</button></p>
  <p>Auto Clickers Level 2 Bought: <span id="autoClicker5Display">0</span></p>
  <button id="purchaseAutoClicker5" disabled>Auto Clicker 2 Upgrade</button>
  <p>Auto Clickers Level 3 Bought: <span id="autoClicker20Display">0</span></p>
  <button id="purchaseAutoClicker20" disabled>Auto Clicker 3 Upgrade</button>
`;

document.body.style.backgroundColor = "lightgrey";

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const cpsDisplayElement = document.getElementById("cpsDisplay")!;

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
  if (counter >= currentUpgrade1Cost) {
    counter -= currentUpgrade1Cost;
    upgrade1Count++;
    growthRateDisplay.textContent = upgrade1Count.toString();
    // Recalculates the cost for the next upgrades
    currentUpgrade1Cost = Math.floor(
      baseUpgrade1Cost * Math.pow(costMultiplier, upgrade1Count),
    );
  }
});

purchaseAutoClicker5Button.addEventListener("click", () => {
  if (counter >= currentUpgrade2Cost) {
    counter -= currentUpgrade2Cost;
    upgrade2Count++;
    autoClicker5Display.textContent = upgrade2Count.toString();
    currentUpgrade2Cost = Math.floor(
      baseUpgrade2Cost * Math.pow(costMultiplier, upgrade2Count),
    );
  }
});

purchaseAutoClicker20Button.addEventListener("click", () => {
  if (counter >= currentUpgrade3Cost) {
    counter -= currentUpgrade3Cost;
    upgrade3Count++;
    autoClicker20Display.textContent = upgrade3Count.toString();
    currentUpgrade3Cost = Math.floor(
      baseUpgrade3Cost * Math.pow(costMultiplier, upgrade3Count),
    );
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
  cpsDisplayElement.textContent = totalGrowthPerSecond.toString();

  purchaseUpgradeButton.textContent =
    `Auto Clicker 1 Upgrade (Cost: ${currentUpgrade1Cost})`;
  purchaseAutoClicker5Button.textContent =
    `Auto Clicker 2 Upgrade (Cost: ${currentUpgrade2Cost})`;
  purchaseAutoClicker20Button.textContent =
    `Auto Clicker 3 Upgrade (Cost: ${currentUpgrade3Cost})`;

  purchaseUpgradeButton.disabled = counter < currentUpgrade1Cost;
  purchaseAutoClicker5Button.disabled = counter < currentUpgrade2Cost;
  purchaseAutoClicker20Button.disabled = counter < currentUpgrade3Cost;

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
