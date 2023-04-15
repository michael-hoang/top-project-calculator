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

// Event listeners
digitBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        let value = event.target.innerHTML;
        if (operator === '') {
            a += (value);
            display.innerHTML = a;
        }
    });
});