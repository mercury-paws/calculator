import  operate  from './js/operate.js';
import { updateDisplay } from './js/updateDisplay.js';

let currentInput = '';
let previousInput = '';
let operator = null;

document.addEventListener('DOMContentLoaded', () => {
    clearCalculator();
    eventListeners();
    keyboardSupport();
});

function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay('0');
}

function inputNumber(value) {
    if (value === '.' && currentInput.includes('.')) return;
    currentInput += value;
    updateDisplay(currentInput || '0');
}

function setOperator(newOperator) {
    if (!currentInput && operator) {
        operator = newOperator; 
        return;
    }
    if (previousInput && currentInput) {
        currentInput = operate(operator, previousInput, currentInput);
        updateDisplay(currentInput);
    }
    operator = newOperator; 
    previousInput = currentInput; 
    currentInput = ''; 
}

function calculate() {
    if (!operator || !currentInput || !previousInput) return;
    currentInput = operate(operator, previousInput, currentInput);
    updateDisplay(currentInput);
    operator = null;
    previousInput = '';
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0');
}

function toggleSign() {
    if (!currentInput) return;
    currentInput = -currentInput;
    updateDisplay(currentInput);
}

function eventListeners() {
    document.querySelectorAll('[data-type="number"]').forEach(button => {
        button.addEventListener('click', () => inputNumber(button.dataset.value));
    });
    document.querySelectorAll('[data-type="operator"]').forEach(button => {
        button.addEventListener('click', () => setOperator(button.dataset.value));
    });
    document.getElementById('equals').addEventListener('click', calculate);
    document.getElementById('clear').addEventListener('click', clearCalculator);
    document.getElementById('backspace').addEventListener('click', backspace);
    document.getElementById('comma').addEventListener('click', () => inputNumber('.'));
    document.getElementById('signs').addEventListener('click', toggleSign);
}

function keyboardSupport() {
    document.addEventListener('keydown', (e) => {
        const key = e.key;

        if (key >= '0' && key <= '9') {
            inputNumber(key);
        } else if (['+', '-', '*', '/'].includes(key)) {
            setOperator(key);
        } else if (key === 'Enter' || key === '=') {
            calculate();
        } else if (key === 'Backspace') {
            backspace();
        } else if (key.toLowerCase() === 'c') {
            clearCalculator();
        } else if (key === '.') {
            inputNumber('.');
        }
        e.preventDefault();
    });
}
