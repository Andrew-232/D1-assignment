//Keeping incase I want to use it for later and to have a starting point for Later
/*
import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";
*/

//Keeping incase I want to use it for later and to have a starting point for Later
/*
document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;
*/
let counter: number = 0;
let growthRate: number = 0;
const upgradeCost: number = 10;

document.body.innerHTML = `
  <h1>Clicker Game</h1>
  <p>Counter: <span id="counter">0</span></p>
  <p>Growth Rate: <span id="growthRateDisplay">0</span> units/sec</p>
  <button id="increment">Manuel Clicker Button!</button>
  <button id="purchaseUpgrade" disabled>Purchase Auto Clicker Upgrade (Cost: ${upgradeCost})</button>
`;

document.body.style.backgroundColor = "lightgrey";

// Add click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
// Asked chat how to fix the problem I had as when I added the code on line 69 it wouldn't work and it told me to add "as HTMLButtonElement" which fixed the problem.
// To show my understanding on how it explained it to me, Typescript didn't realize this as a button but only as a generic HTMLElement
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
  if (counter >= upgradeCost) {
    counter -= upgradeCost;
    growthRate++;
    growthRateDisplay.textContent = growthRate.toString();
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

  counter += growthRate * deltaTime;

  counterElement.textContent = Math.floor(counter).toString();

  //Added this line as the player was never able to buy an upgrade since the button never got enabled.
  purchaseUpgradeButton.disabled = counter < upgradeCost;

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
