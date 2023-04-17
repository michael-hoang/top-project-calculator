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
const displayUpper = document.querySelector('#display-upper-text');
const displayLower = document.querySelector('#display-lower-text');
const clearBtn = document.querySelector('#clear')
const digitBtns = document.querySelectorAll('.digits');
const operatorBtns = document.querySelectorAll('.operators');
const decimalBtn = document.querySelector('#dot');

// Update display function
function updateDisplay() {
    if (operator) {
        if (!b) {
            displayUpper.innerHTML = a + operator;
            displayLower.innerHTML = a;
        } else {
            displayUpper.innerHTML = a + operator;
            displayLower.innerHTML = b;
        }    
    } else {
        displayLower.innerHTML = a;
    }
}

// Event listeners
clearBtn.addEventListener('click', (event) => {
    a = '';
    operator = '';
    b = '';
    dot = '';
    displayUpper.innerHTML = ''
    displayLower.innerHTML = '0'
});

digitBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        let value = event.target.innerHTML;
        if (operator === '') {
            a = processOperand(a, value);
            updateDisplay()
        } else {
            b = processOperand(b, value);
            updateDisplay()

        }
    });
});

operatorBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        operator = event.target.innerHTML;
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

// Functions for processing number strings
function processOperand(operand, value) {
    if (operand === '00') {
        operand = '0';
    } else if (operand === '0') {
        operand = value;
    } else {
        operand += value;
    }
    return operand;
}

function processDecimalPoint(operand) {
    if (!operand) {
        operand = '0.'
    } else if (operand.includes(dot)) {
    } else {
        operand += dot;
    }
    return operand;
}