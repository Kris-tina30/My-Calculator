// defolt values
const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingOfSecondOperand: false,
  operator: "0",
};

// update display = add defolt 0 for input
const updateDisplay = () => {
  const display = document.querySelector(".screen");
  display.value = calculator.displayValue;
};
updateDisplay();

//handl key press

const keys = document.querySelector(".keys");
keys.addEventListener("click", (event) => {
  const target = event.target;
  //   const { target } = event;
  if (!target.matches("button")) {
    return;
  }
  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains("clearAll")) {
    resetCalculator();
    updateDisplay();
    return;
  }
  inputDigit(target.value);
  updateDisplay();
});

// input digit
const inputDigit = (digit) => {
  const { displayValue, waitingOfSecondOperand } = calculator;
  if (waitingOfSecondOperand) {
    calculator.displayValue = digit;
    calculator.waitingOfSecondOperand = false;
  } else {
    if (displayValue === "0") {
      calculator.displayValue = digit;
    } else {
      calculator.displayValue += digit;
    }
  }
};
// input decimal

const inputDecimal = (dot) => {
  if (calculator.waitingOfSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingOfSecondOperand = false;
    return;
  }
  if (calculator.displayValue === "" || calculator.displayValue === "0") {
    calculator.displayValue = "0.";
  } else {
    calculator.displayValue += dot;
  }
};

// handele Operator
const handleOperator = (nextOperator) => {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingOfSecondOperand) {
    calculator.operator = nextOperator;

    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = `${parseFloat(result.toFixed(4))}`;
    calculator.firstOperand = result;
  }
  calculator.waitingOfSecondOperand = true;
  calculator.operator = nextOperator;
};
// calculate logic
const calculate = (firstOperand, secondOperand, operator) => {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }
  return secondOperand;
};
//  reset calculator

const resetCalculator = () => {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingOfSecondOperand = false;
  calculator.operator = "0";
};
