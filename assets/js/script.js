// Basic math operator functions inside an object
const operators = {
    '+': (a, b) => {return a + b},
    '-': (a, b) => {return a - b},
    '*': (a, b) => {return a * b},
    '/': (a, b) => {return a / b},
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
const display = document.querySelector('#display-text');
const decimalBtn = document.querySelector('#dot')

// Update display function
function updateDisplay() {
    display.innerHTML = a + operator + b
}

// Event listeners
digitBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        let value = event.target.innerHTML;
        if (operator === '') {
            a += value;
            if (a === '00') {
                a = 0;
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
        if (a === '') {
            a = 0; 
        }
        updateDisplay()
    });
});

decimalBtn.addEventListener('click', (event) => {
    dot = event.target.innerHTML;
    if (!a) {
        a = '0.';
    } else {
        a += dot;
    }
    updateDisplay()
});