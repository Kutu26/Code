let count = 0;

function increment() {
    count++;
    updateDisplay();
}

function decrement() {
    count--;
    updateDisplay();
    
}

function reset() {
    count = 0;
    updateDisplay();
}

function save() {
    const savedValues = document.getElementById('saved-values');
    const newValue = document.createElement('div');
    newValue.className = 'saved-values-item';
    newValue.textContent = count;
    savedValues.appendChild(newValue);
}

function updateDisplay() {
    document.getElementById('counter-display').textContent = count;
}
