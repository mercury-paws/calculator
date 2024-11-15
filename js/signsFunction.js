function toggleSign() {
    if (!currentInput) return; // If there's no current input, do nothing
    currentInput = (parseFloat(currentInput) * -1).toString(); // Toggle the sign and convert back to string
    updateDisplay(currentInput); // Update the display
}
