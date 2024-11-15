import  operate  from './js/operate.js';
import { updateDisplay } from './js/updateDisplay.js';

let currentInput = '';
let previousInput = '';
let operator = null;

document.addEventListener('DOMContentLoaded', () => {
    clearCalculator();
    eventListeners();
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
    if (!currentInput) return;
    if (previousInput) {
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
}
