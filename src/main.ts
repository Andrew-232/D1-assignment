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

document.body.innerHTML = `
  <h1>Clicker Game</h1>
  <p>Counter: <span id="counter">0</span></p>
  <button id="increment">Manuel Clicker Button!</button>
`;

document.body.style.backgroundColor = "lightgrey";

// Add click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();
});

// Added set interval where the counter hould increase by 1 every second.
//Will comment out to complete step 4
// setInterval(() => {
//   counter++;
//   console.log("setInterval code is working");
//   counterElement.textContent = counter.toString();
// }, 1000);

let currentFrame: number = 0;

//Function for the animation loop
function gameLoop(timestamp: number) {
  if (currentFrame === 0) {
    currentFrame = timestamp;
  }

  const deltaTime = (timestamp - currentFrame) / 1000;
  
  currentFrame = timestamp;
  
  const growthThisFrame = 1 * deltaTime;
  
  counter += growthThisFrame;
  
  counterElement.textContent = Math.floor(counter).toString();

  requestAnimationFrame(gameLoop);
  console.log("requestion animation frame function is hopefully working!");
}

requestAnimationFrame(gameLoop);
