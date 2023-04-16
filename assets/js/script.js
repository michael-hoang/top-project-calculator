// Basic math operator functions inside an object
const operators = {
    '+': (a, b) => {return a + b},
    '−': (a, b) => {return a - b},
    '×': (a, b) => {return a * b},
    '÷': (a, b) => {return a / b},
}
// Container for the operands, operator, and decimal point.
let a = '';
let operator = '';
let b = '';
let dot = '';

// Math operation function
function operate(a, operator, b) {
    return operators[operator](a, b);
}

// Reference to HTML elements
const digitBtns = document.querySelectorAll('.digits');
const operatorBtns = document.querySelectorAll('.operators');
const displayLower = document.querySelector('#display-lower-text');
const decimalBtn = document.querySelector('#dot')

// Update display function
function updateDisplay() {
    displayLower.innerHTML = a + operator + b
}

// Event listeners
digitBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        let value = event.target.innerHTML;
        if (operator === '') {
            a += value;
            if (a === '00') {
                a = '0';
            }
        } else {
            b += value;
        }
        updateDisplay()
    });
});

operatorBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        operator = event.target.innerHTML;
        console.log(operator);
        console.log(typeof operator);
        if (a === '') {
            a = '0'; 
        }
        updateDisplay()
    });
});

decimalBtn.addEventListener('click', (event) => {
    dot = event.target.innerHTML;
    if (!operator) {
        a = processDecimalPoint(a);
    } else {
        b = processDecimalPoint(b);
    }
    updateDisplay()
});

// Function for processing strings with a decimal point
function processDecimalPoint(operand) {
    if (!operand) {
        operand = '0.'
    } else if (operand.includes(dot)) {
    } else {
        operand += dot;
    }
    return operand;
}