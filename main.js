const calculator = document.querySelector(".calc");
let input = {
  current: "",
  previous: "",
};
let calculResult = "";
let operator = "";

calculator.addEventListener("click", function (event) {
  const button = event.target;
  if (button.classList.contains("calc__button--number")) {
    if (operator === "=") {
      input.current = "";
      input.previous = "";
      operator = "";
    }
    input.current += `${button.innerHTML}`;
    updateDisplay(input.current);
  } else if (button.classList.contains("calc__button--clear")) {
    resetCalc();
  } else if (button.classList.contains("calc__button--backspace")) {
    if (operator === "=") resetCalc();
    else {
      input.current = input.current.slice(0, -1);
      if (input.current.length === 0) updateDisplay("0");
      else updateDisplay(input.current);
    }
  } else if (button.classList.contains("calc__button--operator")) {
    if (operator === "=") {
      input.previous = calculResult;
    } else if (operator !== "") {
      input.previous = calculIt(input, operator);
      updateDisplay(input.previous);
    } else {
      input.previous = input.current;
    }
    operator = `${button.innerHTML}`;
    input.current = "";
  } else if (button.classList.contains("calc__button--result")) {
    calculResult = calculIt(input, operator);
    updateDisplay(calculResult);
    operator = "=";
  }
});

function calculIt(values, operator) {
  let result = 0;
  if (values.current === "") values.current = "0";
  if (values.previous === "") values.previous = "0";
  let A = parseInt(values.previous, 10);
  let B = parseInt(values.current, 10);
  switch (operator) {
    case "÷":
      result = A / B;
      break;
    case "✕":
      result = A * B;
      break;
    case "-":
      result = A - B;
      break;
    case "+":
      result = A + B;
      break;
  }
  return result.toString();
}

function resetCalc() {
  input.current = "";
  input.previous = "";
  operator = "";
  updateDisplay("0");
}

function updateDisplay(number) {
  const display = document.querySelector(".calc__display");
  display.innerHTML = number;
}
