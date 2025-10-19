// Changed the core currency to "Grains of Sand"
let grainsOfSand: number = 0;

const costMultiplier: number = 1.15; // 15% increase per purchase

// Changed upgrade 1 to "Gentle Breeze"
let breezeCount: number = 0;
const baseBreezeCost: number = 10;
let currentBreezeCost: number = baseBreezeCost;

// Changed upgrade 2 to "Desert Lizard"
let lizardCount: number = 0;
const baseLizardCost: number = 50;
let currentLizardCost: number = baseLizardCost;

// Changed upgrade 3 to "Whirling Dust Devil"
let dustDevilCount: number = 0;
const baseDustDevilCost: number = 100;
let currentDustDevilCost: number = baseDustDevilCost;

// Updated HTML and added CSS for the new images.
document.body.innerHTML = `
  <style>
    .header-image {
      width: 400px; /* Adjust size as needed */
      border-radius: 10px;
    }
    #createSandButton {
      width: 200px; /* Adjust size as needed */
      cursor: pointer;
      transition: transform 0.1s;
    }
    #createSandButton:active {
      transform: scale(0.95); /* Adds a click effect */
    }
  </style>

  <h1>Grains of Sand</h1>
  <img src="grains-of-sand.jpg" class="header-image" alt="Grains of Sand Title Image">
  
  <p>Grains of Sand: <span id="sandCounter">0</span></p>
  <p>Grains per second: <span id="gpsDisplay">0</span></p>

  <p>Gather Sand</p>
  
  <img src="single-grain.jpg" id="createSandButton" alt="Click to create a grain of sand">
  
  
  <div>
    <h3>Gentle Breezes: <span id="breezeCountDisplay">0</span></h3>
    <p>A soft wind that endlessly gathers a single grain per second.</p>
    <button id="purchaseBreeze" disabled>Summon Breeze</button>
  </div>

  <div>
    <h3>Desert Lizards: <span id="lizardCountDisplay">0</span></h3>
    <p>Life stirs, kicking up 5 grains per second.</p>
    <button id="purchaseLizard" disabled>Spawn Lizard</button>
  </div>
  
  <div>
    <h3>Whirling Dust Devils: <span id="dustDevilCountDisplay">0</span></h3>
    <p>A vortex of sand, collecting 20 grains per second.</p>
    <button id="purchaseDustDevil" disabled>Conjure Dust Devil</button>
  </div>
`;

document.body.style.backgroundColor = "khaki"; // A more sandy color to go with the new theme

const createSandButton = document.getElementById("createSandButton")!;
const sandCounterElement = document.getElementById("sandCounter")!;
const gpsDisplayElement = document.getElementById("gpsDisplay")!;

const purchaseBreezeButton = document.getElementById(
  "purchaseBreeze",
) as HTMLButtonElement;
const breezeCountDisplay = document.getElementById("breezeCountDisplay")!;

const purchaseLizardButton = document.getElementById(
  "purchaseLizard",
) as HTMLButtonElement;
const lizardCountDisplay = document.getElementById("lizardCountDisplay")!;

const purchaseDustDevilButton = document.getElementById(
  "purchaseDustDevil",
) as HTMLButtonElement;
const dustDevilCountDisplay = document.getElementById("dustDevilCountDisplay")!;

// Event Listeners
createSandButton.addEventListener("click", () => {
  grainsOfSand++;
  sandCounterElement.textContent = Math.floor(grainsOfSand).toString();
});

purchaseBreezeButton.addEventListener("click", () => {
  if (grainsOfSand >= currentBreezeCost) {
    grainsOfSand -= currentBreezeCost;
    breezeCount++;
    breezeCountDisplay.textContent = breezeCount.toString();
    // Recalculates the cost for the next upgrade
    currentBreezeCost = Math.floor(
      baseBreezeCost * Math.pow(costMultiplier, breezeCount),
    );
  }
});

purchaseLizardButton.addEventListener("click", () => {
  if (grainsOfSand >= currentLizardCost) {
    grainsOfSand -= currentLizardCost;
    lizardCount++;
    lizardCountDisplay.textContent = lizardCount.toString();
    currentLizardCost = Math.floor(
      baseLizardCost * Math.pow(costMultiplier, lizardCount),
    );
  }
});

purchaseDustDevilButton.addEventListener("click", () => {
  if (grainsOfSand >= currentDustDevilCost) {
    grainsOfSand -= currentDustDevilCost;
    dustDevilCount++;
    dustDevilCountDisplay.textContent = dustDevilCount.toString();
    currentDustDevilCost = Math.floor(
      baseDustDevilCost * Math.pow(costMultiplier, dustDevilCount),
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

  // Calculates total Grains Per Second (GPS)
  const totalGrainsPerSecond = breezeCount * 1 + lizardCount * 5 +
    dustDevilCount * 20;

  grainsOfSand += totalGrainsPerSecond * deltaTime;

  sandCounterElement.textContent = Math.floor(grainsOfSand).toString();
  gpsDisplayElement.textContent = totalGrainsPerSecond.toFixed(1);

  // Updated button text with new theme and costs.
  purchaseBreezeButton.textContent =
    `Summon Breeze (Cost: ${currentBreezeCost} Grains)`;
  purchaseLizardButton.textContent =
    `Spawn Lizard (Cost: ${currentLizardCost} Grains)`;
  purchaseDustDevilButton.textContent =
    `Conjure Dust Devil (Cost: ${currentDustDevilCost} Grains)`;

  // Updated button disabled state with the name changes.
  purchaseBreezeButton.disabled = grainsOfSand < currentBreezeCost;
  purchaseLizardButton.disabled = grainsOfSand < currentLizardCost;
  purchaseDustDevilButton.disabled = grainsOfSand < currentDustDevilCost;

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
