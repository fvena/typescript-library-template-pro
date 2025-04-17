import { add } from "@franvena/consoleui";

const number1 = document.querySelector("#num1");
const number2 = document.querySelector("#num2");
const result = document.querySelector("#result");

number1.addEventListener("input", () => {
  result.value = add(Number.parseFloat(number1.value), Number.parseFloat(number2.value));
});

number2.addEventListener("input", () => {
  result.value = add(Number.parseFloat(number1.value), Number.parseFloat(number2.value));
});

result.value = add(Number.parseFloat(number1.value), Number.parseFloat(number2.value));

console.log("Hello ConsoleUI!");
console.log(`add(5, 3) =`, add(5, 3));
