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
setInterval(() => {
  counter++;
  counterElement.textContent = counter.toString();
}, 1000);
