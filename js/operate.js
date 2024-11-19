import { add, subtract, multiply, divide } from './mathFunctions.js';

export default function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);

    if (isNaN(a) || isNaN(b)) {
        return "Error: Invalid input";
    }

    let result;
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
        default:
            return 'Error: Invalid operator';
    }
    return typeof result === 'number' ? parseFloat(result.toFixed(4)) : result;
}
