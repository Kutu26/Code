const result = document.getElementById('result');
let currentInput = '';
let previousInput = '';
let operator = '';

const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        if (!isNaN(value) || value === '.') {
            handleNumber(value);
        } else {
            handleOperator(value);
        }
    });
});

function handleNumber(value) {
    if (currentInput.length < 10) {
        currentInput += value;
        updateScreen(currentInput);
    }
}

function handleOperator(value) {
    switch (value) {
        case 'AC':
            clearAll();
            break;
        case '±':
            toggleSign();
            break;
        case '%':
            percentage();
            break;
        case '=':
            calculate();
            break;
        default:
            setOperator(value);
            break;
    }
}

function updateScreen(value) {
    result.innerText = value;
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateScreen('0');
}

function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateScreen(currentInput);
}

function percentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateScreen(currentInput);
}

function setOperator(op) {
    if (currentInput === '') return;

    previousInput = currentInput;
    currentInput = '';
    operator = op;
}

function calculate() {
    if (previousInput === '' || currentInput === '') return;

    const a = parseFloat(previousInput);
    const b = parseFloat(currentInput);
    let result = 0;

    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '−':
            result = a - b;
            break;
        case '×':
            result = a * b;
            break;
        case '÷':
            result = a / b;
            break;
    }

    currentInput = result.toString();
    operator = '';
    updateScreen(currentInput);
}
