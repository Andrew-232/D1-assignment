let counter: number = 0;

let upgrade1Count: number = 0;
const upgrade1Cost: number = 10;

// Should add another upgrade which will cost 50 but will increase the auto clicker by 5
// let upgrade2Count: number = 0;
// const upgrade2Cost: number = 50;

// // Should add another upgrade which will cost 100 but will increase the auto clicker by 20
// let upgrade3Count: number = 0;
// const upgrade3Cost: number = 100;

document.body.innerHTML = `
  <h1>Clicker Game</h1>
  <p>Counter: <span id="counter">0</span></p>
  <p>Auto Clickers Bought: <span id="growthRateDisplay">0</span></p>
  <p><button id="increment">Manuel Clicker Button!</button></p>
  <p><button id="purchaseUpgrade" disabled>Auto Clicker 1 Upgrade (Cost: ${upgrade1Cost})</button></p>
`;

document.body.style.backgroundColor = "lightgrey";

// Add click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const purchaseUpgradeButton = document.getElementById(
  "purchaseUpgrade",
) as HTMLButtonElement;
const growthRateDisplay = document.getElementById("growthRateDisplay")!;

button.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();
});

//Logic for the upgrade
purchaseUpgradeButton.addEventListener("click", () => {
  if (counter >= upgrade1Cost) {
    counter -= upgrade1Cost;
    upgrade1Count++;
    growthRateDisplay.textContent = upgrade1Count.toString();
    console.log("Upgrade bought!");
  }
});

let currentFrame: number = 0;

//Function for the animation loop
function gameLoop(timestamp: number) {
  if (currentFrame === 0) {
    currentFrame = timestamp;
  }

  const deltaTime = (timestamp - currentFrame) / 1000;

  currentFrame = timestamp;

  counter += upgrade1Count * deltaTime;

  counterElement.textContent = Math.floor(counter).toString();

  purchaseUpgradeButton.disabled = counter < upgrade1Cost;

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
