const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
    document.querySelector("#inputLog").innerHTML = ''; // Clear log
}

function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
    logInput(digit);
}

function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
        calculator.displayNumber = "0";
        logInput(operator);
    } else {
        alert("Operator sudah ditetapkan");
    }
}

function logInput(input) {
    const logList = document.querySelector("#inputLog");
    const logItem = document.createElement("li");
    logItem.textContent = input;
    logList.appendChild(logItem);
}

function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }

    let result = 0;
    switch (calculator.operator) {
        case "+":
            result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
            break;
        case "-":
            result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
            break;
        case "*":
            result = parseInt(calculator.firstNumber) * parseInt(calculator.displayNumber);
            break;
        case "/":
            if (calculator.displayNumber === "0") {
                alert("Tidak bisa membagi dengan nol");
                return;
            }
            result = parseInt(calculator.firstNumber) / parseInt(calculator.displayNumber);
            break;
        case "^":
            result = Math.pow(parseInt(calculator.firstNumber), parseInt(calculator.displayNumber));
            break;
        case "√":
            if (calculator.displayNumber < 0) {
                alert("Tidak bisa menghitung akar dari bilangan negatif");
                return;
            }
            result = Math.sqrt(parseInt(calculator.displayNumber));
            break;
        default:
            alert("Operator tidak dikenal");
            return;
    }

    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result,
    };

    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function(event) {
        const target = event.target;

        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    });
}

function logInput(input) {
  const logList = document.querySelector("#inputLog");
  logList.innerHTML += input + " "; // Append input with a space
}

function clearCalculator() {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
  document.querySelector("#inputLog").innerHTML = ""; // Clear log
  updateDisplay(); // Ensure display is updated
}
