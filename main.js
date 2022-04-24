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
            this.firstOperand = (this.operator === null) ? this.firstOperand : operate(this.firstOperand, this.secondOperand, this.operator);
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
    }
}

function setOperator(e){
    if(e.target.className !== "operatorButton") return;
    if (e.target.textContent === "="){
        if (buffer.firstOperand !== null && buffer.operator !== null && display.mask !== ""){
            buffer.manage();
            buffer.operator = null;
            deactivateNumbersButtons();
            const buttons = document.querySelector('#operatorsPad');
            buttons.addEventListener('click', continueOperation);
        }
        return;
    } else if (e.target.textContent === "AC"){
        setDefaults();
        return;
    }
    buffer.manage();
    buffer.operator = e.target.textContent;
}

function callInject(e){
    display.inject(e);
}

function deactivateNumbersButtons(){
    const buttons = document.querySelector('#numberPad');
    buttons.removeEventListener('click', callInject);
}

function activateNumbersButtons(){
    const buttons = document.querySelector('#numberPad');
    buttons.addEventListener('click', callInject);
}

function activateOperatorsPad(){
    const buttons = document.querySelector('#operatorsPad');
    buttons.addEventListener('click', setOperator);
}

function continueOperation(e){
    if(e.target.className !== "operatorButton") return;
    const buttons = document.querySelector('#operatorsPad');
    activateNumbersButtons();
    buttons.removeEventListener('click', continueOperation);
}

function setDefaults(){
    display.mask = 0;
    display.manage();
    buffer.firstOperand = null;
    buffer.secondOperand = null;
    buffer.operator = null;
}

addEventListener("DOMContentLoaded", ()=>{
    setDefaults();
    activateNumbersButtons();
    activateOperatorsPad();
});