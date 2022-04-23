const display = document.querySelector('#display');

function add(firstOperand, secondOperand){
    return firstOperand + secondOperand;
}
function subtract(firstOperand, secondOperand){
    return firstOperand - secondOperand;
}
function multiply(firstOperand, secondOperand){
    return firstOperand * secondOperand;
}
function divide(firstOperand, secondOperand){
    return firstOperand / secondOperand;
}
function operate(firstOperand, secondOperand, operator){
    switch (operator){
        case '+':
            return add(firstOperand,secondOperand);
            break;
        case '-':
            return subtract(firstOperand,secondOperand);
            break;
        case '*':
            return multiply(firstOperand, secondOperand);
            break;
        case '/':
            return divide(firstOperand, secondOperand)
            break;
        default:
            return "Invalid Operator!";
    }
}

function injectInDisplay(e){
    if (display.textContent === '0') display.textContent = "";
    display.textContent += e.target.className === 'numButton' ? e.target.textContent 
    : display.textContent === '0' ? '0' : "";
}

function activateNumbersButtons(){
    const buttons = document.querySelector('#numberPad');
    buttons.addEventListener('click', injectInDisplay);
}

addEventListener("DOMContentLoaded", activateNumbersButtons);