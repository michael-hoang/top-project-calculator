// Basic math operator functions inside an object
const operators = {
    '+': (a, b) => {return a + b},
    '-': (a, b) => {return a - b},
    '*': (a, b) => {return a * b},
    '/': (a, b) => {return a / b},
}
// Container for the operands and the operator
let a = '';
let operator = '';
let b = '';

// Math operation function
function operate(a, operator, b) {
    return operators[operator](a, b);
}

// Reference to HTML elements
const digitBtns = document.querySelectorAll('.digits');
const operatorBtns = document.querySelectorAll('.operators');
const display = document.querySelector('#display-text');

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
        } else {
            b += value;
        }
        updateDisplay()
    });
});

operatorBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        operator = event.target.innerHTML;
        console.log(operator)
        if (a === '') {
            a = 0; 
        }
        display.innerHTML = a + operator;
    });
});