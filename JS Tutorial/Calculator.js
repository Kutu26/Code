let userInputTextarea = document.getElementById('userInput');
let solutionTextarea = document.getElementById('solution');
let lastKeyWasEqual = false;

const keyMap = {
    '0': 'appendNumber(0)',
    '1': 'appendNumber(1)',
    '2': 'appendNumber(2)',
    '3': 'appendNumber(3)',
    '4': 'appendNumber(4)',
    '5': 'appendNumber(5)',
    '6': 'appendNumber(6)',
    '7': 'appendNumber(7)',
    '8': 'appendNumber(8)',
    '9': 'appendNumber(9)',
    '+': 'appendOperator("+")',
    '-': 'appendOperator("-")',
    '*': 'appendOperator("*")',
    '/': 'appendOperator("/")',
    '.': 'appendDecimal()',
    '=': 'calculate()',
    'Enter': 'calculate()',
    'Escape': 'clearAll()',
    'Delete': 'clearDisplay(), lastKeyWasEqual = false',
    'c': 'clearDisplay(), lastKeyWasEqual = false',
    'Backspace': 'backspace()',
    '(': 'appendParenthesis()',
    ')': 'appendParenthesis()'
};

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key in keyMap) {
        eval(keyMap[key]);
    }
    if (key === 'Enter' || key === '=') {
        lastKeyWasEqual = true;
    } else {
        lastKeyWasEqual = false;
    }
});

function toggleTheme() {
    document.body.classList.toggle('dark');
}

function appendNumber(number) {
    if (lastKeyWasEqual) {
        clearDisplay();
        lastKeyWasEqual = false;
    }
    userInputTextarea.value += number;
}

function appendOperator(operator) {
    if (lastKeyWasEqual) {
        lastKeyWasEqual = false;
    }
    userInputTextarea.value += operator;
}

function appendDecimal() {
    if (lastKeyWasEqual) {
        clearDisplay();
        lastKeyWasEqual = false;
    }
    const lastNumber = userInputTextarea.value.split(/[\+\-\*\/]/).pop();
    if (!lastNumber.includes('.')) {
        userInputTextarea.value += '.';
    }
}
function clearDisplay() {
    userInputTextarea.value = '';
}

function clearAll() {
    userInputTextarea.value = '';
    solutionTextarea.value = '';
}

function calculate() {
    const openParenthesisCount = (userInputTextarea.value.match(/\(/g) || []).length;
    const closeParenthesisCount = (userInputTextarea.value.match(/\)/g) || []).length;

    if (openParenthesisCount > closeParenthesisCount) {
        userInputTextarea.value += ')';
    }

    try {
        let result = eval(userInputTextarea.value);
        if (result === Infinity) {
            solutionTextarea.value = '∞';
        } 
        else if (result === -Infinity) {
            solutionTextarea.value = '-∞';
        }
        else if (result === undefined) {
            solutionTextarea.value = '';
        }
        else {
            solutionTextarea.value = result;
        }
    } catch (error) {
        solutionTextarea.value = 'Error';
    }
    lastKeyWasEqual = true;
}

function backspace() {
    userInputTextarea.value = userInputTextarea.value.slice(0, -1);
}

let lastInputWasCloseParenthesis = false;

function appendParenthesis() {
    const openParenthesisCount = (userInputTextarea.value.match(/\(/g) || []).length;
    const closeParenthesisCount = (userInputTextarea.value.match(/\)/g) || []).length;

    if (openParenthesisCount > closeParenthesisCount) {
        userInputTextarea.value += ')';
        lastInputWasCloseParenthesis = true;
    } else {
        if (/[0-9]$/.test(userInputTextarea.value)) {
            userInputTextarea.value += '*(';
        } else {
            userInputTextarea.value += '(';
        }
        lastInputWasCloseParenthesis = false;
    }
}

function appendNumber(num) {
    if (lastKeyWasEqual) {
        clearDisplay();
        lastKeyWasEqual = false;
    }
    if (lastInputWasCloseParenthesis) {
        userInputTextarea.value += '*' + num;
    } else {
        userInputTextarea.value += num;
    }
    lastInputWasCloseParenthesis = false;
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mousedown', function(event) {
        event.preventDefault();
    });
});