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
const delBtn = document.querySelector('#delete')
const signBtn = document.querySelector('#sign')

// Update display function
function updateDisplay() {
    if (!equalPreviouslyClicked) {
        if (operator) {
            // convert operands into a Number data type for formatting purposes (i.e. excess trailing 0's)
            a = Number(a);
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
        displayUpper.innerHTML = `${Number(a)} =`;
        displayLower.innerHTML = Number(result);
    } else {
        a = Number(a);
        bTemp = Number(bTemp);
        result = result.toString();
        if (result ==='NaN' || result === 'Infinity') {
            clearBtn.click();
            result = 'Cannot divide by 0';
            displayUpper.innerHTML = ``;
            displayLower.innerHTML = result;
            return;
        }
        displayUpper.innerHTML = `${a} ${operator} ${bTemp} =`;
        displayLower.innerHTML = result;
    }
}

// Event listeners
signBtn.addEventListener('click', (event) => {
    let temp_operand = Number(displayLower.innerHTML) * -1;
    if (equalPreviouslyClicked) {
        clearBtn.click();
        a = temp_operand;

    } else if (!operator) {
        a = temp_operand;
    } else {
        b = temp_operand;
    }
    updateDisplay()
});

clearBtn.addEventListener('click', (event) => {
    a = '';
    operator = '';
    b = '';
    bTemp = '';
    result = '';
    equalPreviouslyClicked = false;
    clearEntryPreviouslyClicked = false;
    displayUpper.innerHTML = ''
    displayLower.innerHTML = '0'
    event.target.blur() // remove focus from clear btn to prevent 'Enter' key from clearing twice
});

clearEntryBtn.addEventListener('click', (event) => {
    if (!operator) {
        a = '';
        displayUpper.innerHTML = '';
    } else if (!equalPreviouslyClicked) {
        b = '';
    } else {
        displayUpper.innerHTML = ''
        a = '0';
        b = bTemp;
        equalPreviouslyClicked = false;
    }
    displayLower.innerHTML = '0';
    clearEntryPreviouslyClicked = true;
});

delBtn.addEventListener('click', (event) => {
    if (!operator) {
        if (displayLower.innerHTML === '0') {
            a = '0';
            updateDisplay()
        } else {
            a = a.slice(0, a.length - 1);
            if (displayLower.innerHTML.length === 1) {
                a = '0';
            }
            updateDisplay()
        }
    } else if (!equalPreviouslyClicked) {
        b = b.slice(0, b.length - 1);
        if (displayLower.innerHTML.length === 1) {
            b = '0';
        }
        updateDisplay()
    } else {
        displayUpper.innerHTML = '';
        a = displayLower.innerHTML
        b = bTemp
        equalPreviouslyClicked = false;
    }
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
            // if operator doesn't exist, then the operand we're working with is 'a', else operand is 'b'
            if (!operator) {
                // set 'a' to 0 if no value
                a = displayLower.innerHTML;
                if (!a) {
                    a = '0';
                    // remove any trailing decimal point
                } else if (a.slice(-1) === '.') {
                    a = a.slice(0, a.length - 1);
                }
            } else {
                // if 'b' exists, compute calculation if user wants to continue to add more operations without clicking 'equal'
                if (b) {
                    a = operate(a, operator, b);
                    b = ''; // reset 'b' for next operation
                }
            }
            // continuation of calculation from preivious result
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
            a = displayLower.innerHTML;
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

            if (!clearEntryPreviouslyClicked) {
                // operand 'b' (using bTemp) assumes value of 'a'
                bTemp = a;
            } else {
                bTemp = displayLower.innerHTML;
                clearEntryPreviouslyClicked = false;
            }

            result = operate(a, operator, bTemp);
            // else if both operands 'a' and 'b', and operator exist
        } else {
            b = displayLower.innerHTML;
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
            clearEntryPreviouslyClicked = false;
        }
        result = operate(a, operator, bTemp);
    }
    result = result.toString();
    if (result.length > 11) {
        result = (+result).toExponential();
        result = limitDecimals(result);
    }
    updateDisplay();
});

// Add keyboard event listener
document.addEventListener('keydown', (event) => {
    digitBtns.forEach((btn) => {
        if (event.key === btn.innerHTML) {
            btn.click();
        }
    });
    operatorBtns.forEach((btn) => {
        if (
            event.key === '/' && btn.innerHTML === '÷' ||
            event.key === '*' && btn.innerHTML === '×' ||
            event.key === '-' && btn.innerHTML === '−' ||
            event.key === '+' && btn.innerHTML === '+'
        ) {
            btn.click();
        }
    });
    if (event.key === 'Enter') {
        equalBtn.click();
    } else if (event.key === '.') {
        decimalPtBtn.click();
    } else if (event.key === 'Backspace') {
        delBtn.click();
    } else if (event.key === 'Delete') {
        clearBtn.click();
    }
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