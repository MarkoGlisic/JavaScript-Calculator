class Calculator {
  constructor(previousValueText, currentValueText) {
    this.previousValueText = previousValueText;
    this.currentValueText = currentValueText;
    this.allClear();
  }

  handleNubmers(number) {
    if (number === "." && this.currentValue.includes(".")) return;
    this.currentValue = this.currentValue.toString() + number.toString();
  }

  updateDisplay() {
    this.previousValueText.innerText = this.previousValue;
    this.currentValueText.innerText = this.currentValue;
  }

  removeSingleDigit() {
    this.currentValue = this.currentValue.toString().slice(0, -1);
  }

  allClear() {
    this.previousValue = "";
    this.currentValue = "";
    this.operation = undefined;
  }

  handleOperators(operation) {
    if (this.currentValue === "") return;
    if (this.previousValue !== "") {
      this.evaluate();
    }
    this.operation = operation;
    this.previousValue = this.currentValue + " " + this.operation;
    this.currentValue = "";
  }

  evaluate() {
    let computation;
    let previous = parseFloat(this.previousValue);
    let current = parseFloat(this.currentValue);
    switch (this.operation) {
      case "+":
        computation = previous + current;
        this.currentValue = computation;
        break;
      case "*":
        computation = previous * current;
        this.currentValue = computation;
        break;
      case "÷":
        computation = previous / current;
        this.currentValue = computation;
        break;
      case "-":
        computation = previous - current;
        this.currentValue = computation;
        break;
      default:
        break;
    }
    this.operation = undefined;
    this.previousValue = "";
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operations]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousValueText = document.querySelector("[data-previous-operand]");
const currentValueText = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousValueText, currentValueText);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.handleNubmers(button.innerText);
    calculator.updateDisplay();
  });
});

allClearButton.addEventListener("click", () => {
  calculator.allClear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.removeSingleDigit();
  calculator.updateDisplay();
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.handleOperators(button.innerText);
    console.log(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.evaluate();
  calculator.updateDisplay();
});
