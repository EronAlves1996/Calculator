const display = {
    elem: document.querySelector('#display'),
    mask: '0',
    inject: function(e){
        if (this.mask === '0') this.mask = "";
        this.mask += e.target.className === 'numButton' ? e.target.textContent : this.mask === '' ? '0' : "";
        this.elem.textContent = this.mask;
    },
    manage: function(){
        this.elem.textContent = this.mask;
        this.mask = "";
    },
}

const buffer = {
    firstOperand: null,
    secondOperand: null,
    operator: null,
    setFirstOperand: function(n){this.firstOperand = parseFloat(n)},
    setSecondOperand: function(n){this.secondOperand = parseFloat(n)},
    manage: function(){
        if (this.firstOperand != null) {
            this.setSecondOperand(!(display.mask === "") ? display.mask : this.secondOperand ? this.secondOperand : this.firstOperand);
            this.firstOperand = operate(this.firstOperand, this.secondOperand, this.operator);
            display.mask = this.firstOperand;
            display.manage();
        }
        else {
            this.setFirstOperand(display.mask); 
            display.manage();
        }
    }
};

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
            return divide(firstOperand, secondOperand);
            break;
        default:
            return "Invalid Operator!";
    }
}

function setOperator(e){
    buffer.manage();
    buffer.operator = e.target.textContent;
}

function callInject(e){
    display.inject(e);
}

function activateNumbersButtons(){
    const buttons = document.querySelector('#numberPad');
    buttons.addEventListener('click', callInject);
}

function activateOperatorsPad(){
    const buttons = document.querySelector('#operatorsPad');
    buttons.addEventListener('click', setOperator);
}

addEventListener("DOMContentLoaded", ()=>{
    activateNumbersButtons();
    activateOperatorsPad();
});