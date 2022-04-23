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