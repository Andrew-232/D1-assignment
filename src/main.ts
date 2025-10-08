import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

// Simple counter for demonstration
let counter: number = 0;

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

document.body.innerHTML = `
  <h1>CMPM 121 Project</h1>
  <p>Counter: <span id="counter">0</span></p>
  <button id="increment">Click Me!</button>
`;

// Add click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  // This looks like to a good place to add some logic!
  counter++; // Added counter logic
  counterElement.textContent = counter.toString(); // Added DOM update logic, this is new
  console.log("I have these thingies:", button, counterElement, counter);
});
