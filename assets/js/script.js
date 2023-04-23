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

// Flag to check if equal or CE button was just clicked
let equalPreviouslyClicked = false;
let clearEntryPreviouslyClicked = false;

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
const display = document.querySelector('#display');
const clearEntryBtn = document.querySelector('#clear-entry');

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

clearEntryBtn.addEventListener('click', (event) => {
    if (!operator) {
        a = '';
    } else {
        b = '';
    }
    displayUpper.innerHTML = '';
    displayLower.innerHTML = '0';
    clearEntryPreviouslyClicked = true;
});

digitBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        let value = event.target.innerHTML;
        if (equalPreviouslyClicked) {
            clearBtn.click();
            equalPreviouslyClicked = false;
        }

        if (operator === '') {
            a = processOperand(a, value);
        } else if (b === '' || b === '0') {
            b = processOperand(b, value);
        } else {
            b += value;
        }
        updateDisplay()
    });
});

operatorBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        // check if this is a brand new calculation and not a continuation from previous
        if (!equalPreviouslyClicked) {
            // if operator is pressed, operand = a; else operand = b
            if (!operator) {
                // set 'a' to 0 if no value
                if (!a) {
                    a = '0';
                // remove any trailing decimal point
                } else if (a.slice(-1) === '.') {
                    a = a.slice(0, a.length - 1);
                }
            } else {
                if (b) {
                    a = operate(a, operator, b);
                    b = '';
                }
            }
        // continuation of previous calculation/operation
        } else {
            a = result;
            equalPreviouslyClicked = false; // reset flag for next operation
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
    // brand new calculation
    if (!equalPreviouslyClicked) {
        // if no operator, operand is 'a'
        if (!operator) {
            if (!a) {
            // set 'a' to 0 if no value
                a = '0';
            // remove trailing decimal point
            } else if (a.slice(-1) === '.') {
                a = a.slice(0, a.length - 1);
            }
            result = a;
        // if operand 'a' and operator exists, but 'b' has no value
        } else if (operator && !b) {
        // operand 'b' (using bTemp) assumes value of 'a'
            bTemp = a;
            result = operate(a, operator, bTemp);
        // else if both operands 'a' and 'b', and operator exist
        } else {
        // remove trailing decimal point
            if (b.slice(-1) === '.') {
                b = b.slice(0, b.length - 1);
            }
            bTemp = b;
            result = operate(a, operator, bTemp);
            b = '';
        }
        equalPreviouslyClicked = true;
    } else {
        if (!clearEntryPreviouslyClicked) {
            a = result;
        } else {
            a = displayLower.innerHTML;
            clearEntryPreviouslyClicked = true;
        }

        result = operate(a, operator, bTemp);
    }

    if (+result > 99999999999999) {
        result = (+result).toExponential();
        result = limitDecimals(result);
    }

    // if (countDecimalPlaces(result) > 6) {
    //     result = (+result).toExponential(6)
    // }
    updateDisplay();
});

// Functions for processing an operand or decimal point string in a calculable format
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
    } else if (operand.includes('.')) {
    } else {
        operand += '.';
    }
    return operand;
}

// Helper functions for formatting numbers
function countDecimalPlaces(value) {
    if (+value % 1 === 0) {
        return 0;
    } else {
        let num_arr = value.toString().split('.');
        let places = num_arr[num_arr.length - 1].length;
        console.log(places);
        return places;
    }
}

function limitDecimals(value) {
    numberString = value.toString();
    if (numberString.includes('e')) {
        decimals = numberString.split('e')[0].split('.')[1].length;
        if (decimals > 5) {
            value = (+value).toPrecision(5);
        }
    }
    return value;
}