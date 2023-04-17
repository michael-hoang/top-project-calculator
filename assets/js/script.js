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
    return operators[operator](+a, +b);
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
            a = processOperand(a, value, 'string');
        } else if (b === '' || b === '0') {
            b = processOperand(b, value, 'string');
        } else {
            b += value;
        }
        updateDisplay()
    });
});

operatorBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        if (a === '') {
            a = '0';
        } else if (operator && b) {
            a = operate(a, operator, b);
            b = '';
        }
        operator = event.target.innerHTML;
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

// Functions for processing an operand as a string or number, or with a decimal point.
function processOperand(operand, value, dataType) {
    if (dataType === 'string') {
        if (operand === '00') {
            operand = '0';
        } else if (operand === '0') {
            operand = value;
        } else {
            operand += value;
        }
    } else if (dataType === 'number') {
        operand = '' + operate(a, operator, operand);
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