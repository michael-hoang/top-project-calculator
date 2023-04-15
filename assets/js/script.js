// Basic math operator functions
const operators = {
    '+': (a, b) => {return a + b},
    '-': (a, b) => {return a - b},
    '*': (a, b) => {return a * b},
    '/': (a, b) => {return a / b},
}
// Container for the operands and the operator
let a, operator, b;

// Math operation
function operate(a, operator, b) {
    return operators[operator](a, b);
}

// Populate display with digit button press
const digitBtns = document.querySelectorAll('.digits');
const display = document.querySelector('#display-text')
digitBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        let value = event.target.innerHTML;
        display.innerHTML = value;
    });
});