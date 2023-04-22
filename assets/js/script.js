// Basic math operator functions inside an object
const operators = {
    '+': (a, b) => { return a + b },
    '−': (a, b) => { return a - b },
    '×': (a, b) => { return a * b },
    '÷': (a, b) => { return a / b },
}
// Container for the operands and operator
let a = '';
let operator = '';
let b = '';

// Container to temporarily store values
let bTemp = '';
let result = '';

// Flag to check if equal button was just clicked
let equalPreviouslyClicked = false;

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
const decimalPtBtn = document.querySelector('#dot');
const equalBtn = document.querySelector('#equal');

// Update display function
function updateDisplay() {
    if (!equalPreviouslyClicked) {
        if (operator) {
            displayUpper.innerHTML = `${a} ${operator}`;
            if (!b) {
                displayLower.innerHTML = a;
            } else {
                displayLower.innerHTML = b;
            }
        } else {
            displayLower.innerHTML = a;
        }
    } else if (!operator) {
        displayUpper.innerHTML = `${a} =`;
        displayLower.innerHTML = result;
    } else {
        displayUpper.innerHTML = `${a} ${operator} ${bTemp} =`;
        displayLower.innerHTML = result;
    }
}

// Event listeners
clearBtn.addEventListener('click', (event) => {
    a = '';
    operator = '';
    b = '';
    bTemp = '';
    result = '';
    equalPreviouslyClicked = false;
    displayUpper.innerHTML = ''
    displayLower.innerHTML = '0'
});

digitBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        let value = event.target.innerHTML;
        if (equalPreviouslyClicked) {
            clearBtn.click();
            equalPreviouslyClicked = false;
        }
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
        if (!equalPreviouslyClicked) {
            if (!operator) {
                if (!a) {
                    a = '0';
                } else if (a.slice(-1) === '.') {
                    a = a.slice(0, a.length - 1);
                }
            } else {
                if (b) {
                    a = operate(a, operator, b);
                    b = '';
                }
            }
        } else {
            a = result;
            equalPreviouslyClicked = false;
        }

        operator = event.target.innerHTML;
        updateDisplay()

    });
});

decimalPtBtn.addEventListener('click', (event) => {
    if (equalPreviouslyClicked) {
        clearBtn.click();
        equalPreviouslyClicked = false;
    }
    if (!operator) {
        a = processDecimalPoint(a);
    } else {
        b = processDecimalPoint(b);
    }
    updateDisplay()
});

equalBtn.addEventListener('click', (event) => {
    if (!equalPreviouslyClicked) {
        if (!operator) {
            if (!a) {
                a = '0';
            } else if (a.slice(-1) === '.') {
                a = a.slice(0, a.length - 1);
            }
            result = a;
        } else if (operator && !b) {
            bTemp = a;
            result = operate(a, operator, bTemp);
        } else {
            if (b.slice(-1) === '.') {
                b = b.slice(0, b.length - 1);
            }
            bTemp = b;
            result = operate(a, operator, bTemp);
            b = '';
        }
        equalPreviouslyClicked = true;
    } else {
        a = result;
        result = operate(a, operator, bTemp);
    }
    updateDisplay();
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
    } else if (operand.includes('.')) {
    } else {
        operand += '.';
    }
    return operand;
}