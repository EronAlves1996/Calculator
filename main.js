const display = {
    elem: document.querySelector('#display'),
    mask: '0',
    inject: function(e){
        if(e.target.className !== "numButton") return;
        if (this.mask === '0') this.mask = "";
        if (e.target.textContent === '.' && this.mask.indexOf('.') !== -1) return;
        if (e.target.id === "backspace"){
            this.eraseDigit();
            return;
        }
        this.mask += e.target.textContent;
        this.elem.textContent = this.mask;
    },
    manage: function(){
        this.elem.textContent = this.mask;
        this.mask = "";
    },
    eraseDigit: function(){
        this.mask = this.mask.slice(0, this.mask.length-1);
        if (this.mask === '') this.mask = '0';
        this.elem.textContent = this.mask;
    }
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
            let result = (this.operator === null) ? this.firstOperand : operate(this.firstOperand, this.secondOperand, this.operator);
            if (result === "ERROR"){
                display.mask = result;
            } else {
                this.setFirstOperand(forceFloatLimit(result));
                display.mask = this.firstOperand;
            }
        }
        else {           
            this.setFirstOperand(display.mask); 
        }
        display.manage();
    }
};

function forceFloatLimit(n){
    return Number(n.toFixed(9));
}

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
    if(secondOperand === 0) return "ERROR"; 
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

function setClickOnKeyPressed(e){
    const buttonsNumbers = document.querySelectorAll(".numButton");
    const buttonsOperators = document.querySelectorAll(".operatorButton");
    const allButtons = [];
    buttonsNumbers.forEach(n=> allButtons.push(n));
    buttonsOperators.forEach(n=> allButtons.push(n));
    allButtons.forEach(n => {
        if(n.dataset.key===e.key) n.click();
    });
}

function activateKeyboard(){
    document.body.addEventListener("keydown", setClickOnKeyPressed);
}

addEventListener("DOMContentLoaded", ()=>{
    setDefaults();
    activateNumbersButtons();
    activateOperatorsPad();
    activateKeyboard();
});