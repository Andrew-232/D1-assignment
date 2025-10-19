// Changed the core currency to "Grains of Sand"
let grainsOfSand: number = 0;

const costMultiplier: number = 1.15; // 15% increase per purchase

// DATA-DRIVEN DESIGN
// All upgrade information is now stored in this single array.
interface GameItem {
  name: string;
  id: string; // Unique ID for HTML elements
  description: string;
  baseCost: number;
  gps: number; // Grains Per Second
  count: number;
  currentCost: number;
}

const gameItems: GameItem[] = [
  {
    name: "Gentle Breeze",
    id: "breeze",
    description:
      "A soft wind that endlessly gathers a single grain per second.",
    baseCost: 10,
    gps: 1,
    count: 0,
    currentCost: 10,
  },
  {
    name: "Desert Lizard",
    id: "lizard",
    description: "Life stirs, kicking up 5 grains per second.",
    baseCost: 50,
    gps: 5,
    count: 0,
    currentCost: 50,
  },
  {
    name: "Whirling Dust Devil",
    id: "dustDevil",
    description: "A vortex of sand, collecting 20 grains per second.",
    baseCost: 100,
    gps: 20,
    count: 0,
    currentCost: 100,
  },
  // New Item 1
  {
    name: "Sandstone Quarry",
    id: "quarry",
    description:
      "Harness geological pressure to form solid rock, chipping away 100 grains per second.",
    baseCost: 1200,
    gps: 100,
    count: 0,
    currentCost: 1200,
  },
  // New Item 2
  {
    name: "Shimmering Mirage",
    id: "mirage",
    description:
      "Bend light and reality to manifest illusory sand, adding 500 grains per second.",
    baseCost: 15000,
    gps: 500,
    count: 0,
    currentCost: 15000,
  },
];

// The main HTML structure with a placeholder for my upgrades.
document.body.innerHTML = `
  <style>
    .header-image { width: 400px; border-radius: 10px; }
    #createSandButton { width: 200px; cursor: pointer; transition: transform 0.1s; }
    #createSandButton:active { transform: scale(0.95); }
  </style>

  <h1>Grains of Sand</h1>
  <img src="./grains-of-sand.jpg" class="header-image" alt="Grains of Sand Title Image">
  
  <p>Grains of Sand: <span id="sandCounter">0</span></p>
  <p>Grains per second: <span id="gpsDisplay">0</span></p>
  
  <img src="./https://github.com/Andrew-232/CMPM-121-Final-D1/single-grain.jpg" id="createSandButton" alt="Click to create a grain of sand">
  
  <div id="upgradesContainer"></div>
`;

document.body.style.backgroundColor = "khaki";

const upgradesContainer = document.getElementById("upgradesContainer")!;

// Loop through our data to build the HTML for each upgrade.
gameItems.forEach((item) => {
  upgradesContainer.innerHTML += `
    <div>
      <h3>${item.name}: <span id="${item.id}CountDisplay">0</span></h3>
      <p>${item.description}</p>
      <button id="purchase-${item.id}" disabled>${item.name}</button>
    </div>
  `;
});

// Get main elements
const createSandButton = document.getElementById("createSandButton")!;
const sandCounterElement = document.getElementById("sandCounter")!;
const gpsDisplayElement = document.getElementById("gpsDisplay")!;

// Main clicker event
createSandButton.addEventListener("click", () => {
  grainsOfSand++;
  sandCounterElement.textContent = Math.floor(grainsOfSand).toString();
});

// Loop to create a single, generic event listener for all purchase buttons.
gameItems.forEach((item) => {
  const purchaseButton = document.getElementById(
    `purchase-${item.id}`,
  ) as HTMLButtonElement;
  purchaseButton.addEventListener("click", () => {
    if (grainsOfSand >= item.currentCost) {
      grainsOfSand -= item.currentCost;
      item.count++;
      // Recalculate the cost for the next upgrade
      item.currentCost = Math.floor(
        item.baseCost * Math.pow(costMultiplier, item.count),
      );
    }
  });
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

  // Calculate total Grains Per Second by looping through the items array.
  const totalGrainsPerSecond = gameItems.reduce((total, item) => {
    return total + item.count * item.gps;
  }, 0);

  grainsOfSand += totalGrainsPerSecond * deltaTime;

  // Update main display
  sandCounterElement.textContent = Math.floor(grainsOfSand).toString();
  gpsDisplayElement.textContent = totalGrainsPerSecond.toFixed(1);

  // Loop through items to update their individual UI elements.
  gameItems.forEach((item) => {
    const countDisplay = document.getElementById(`${item.id}CountDisplay`)!;
    const purchaseButton = document.getElementById(
      `purchase-${item.id}`,
    ) as HTMLButtonElement;

    countDisplay.textContent = item.count.toString();
    purchaseButton.textContent =
      `${item.name} (Cost: ${item.currentCost} Grains)`;
    purchaseButton.disabled = grainsOfSand < item.currentCost;
  });

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
