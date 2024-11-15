const display = document.querySelector('.display');

export function updateDisplay(value) {
    display.textContent = String(value);
}
