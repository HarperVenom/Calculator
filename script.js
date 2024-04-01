const outputStatement = document.querySelector('.output-statement');
const outputResult = document.querySelector('.output-result');

const button1 = document.querySelector('.calc-button-1');
const button2 = document.querySelector('.calc-button-2');
const button3 = document.querySelector('.calc-button-3');
const button4 = document.querySelector('.calc-button-4');
const button5 = document.querySelector('.calc-button-5');
const button6 = document.querySelector('.calc-button-6');
const button7 = document.querySelector('.calc-button-7');
const button8 = document.querySelector('.calc-button-8');
const button9 = document.querySelector('.calc-button-9');
const button0 = document.querySelector('.calc-button-0');

const buttonDot = document.querySelector('.calc-button-dot');
const buttonClear = document.querySelector('.calc-button-clear');

const buttonPlus = document.querySelector('.calc-button-plus');
const buttonMinus = document.querySelector('.calc-button-minus');
const buttonMultiply = document.querySelector('.calc-button-multiply');
const buttonDivide = document.querySelector('.calc-button-divide');

const buttonRemove = document.querySelector('.calc-button-remove');
const buttonEqual = document.querySelector('.calc-button-equal');

document.querySelectorAll('.calc-button').forEach(button => {
    button.addEventListener('click', (e) => {
        switch (e.target) {
            case buttonClear: {
                outputStatement.innerHTML = '0';
                outputResult.innerHTML = '0';
                return;
            }
            case buttonEqual: {
                outputStatement.innerHTML = outputResult.innerHTML;
                return;
            }
            case buttonRemove: {
                if (outputStatement.innerHTML.length === 1) {
                    outputStatement.innerHTML = 0;
                } else {
                    outputStatement.innerHTML = outputStatement.innerHTML.slice(0,outputStatement.innerHTML.length-1);
                }
                updateResult();
                return;
            }
        }
        const sign = convertButtonKey(e.target);
        if (isOperator(sign) && isOperator(outputStatement.innerHTML
            [outputStatement.innerHTML.length-1])) return;
        addToStatement(sign);      
    });
})

function addToStatement(value){
    if (outputStatement.innerHTML.length === 1 && parseInt(outputStatement.innerHTML) === 0 && !isOperator(value)) {
        outputStatement.innerHTML = value;
    } else {
        outputStatement.innerHTML += value;
    }
    updateResult();
}

function updateResult() {
    const string = outputStatement.innerText;

    let operand = '';

    let operandsArray = [0];
    let operatorsArray = [];

    for (let i = 0; i < string.length; i++){
        const key = string[i];
        
        if (!isNaN(parseInt(key)) || key === '.') {
            if (key === '.' && operand.includes('.')){
                outputStatement.innerText = string.slice(0,string.length-1);
                continue;
            } 
            operand += key;
            if (operandsArray.length > 0) {
                operandsArray[operandsArray.length-1] = operand;
            } 
        } else {
            operandsArray.push('');
            operand = '';

            if (isOperator(key)) {
                const operator = key;
                operatorsArray.push(operator);
            }
        }
    }
    outputResult.innerHTML = calculateResult(operandsArray, operatorsArray);; 
}

function calculateResult(operandsArray, operatorsArray) {
    // if (operandsArray[operandsArray.length-1] === ''){
    //     console.log('last is operaotr');
    //     console.log(operatorsArray);
    //     operatorsArray.splice(operatorsArray.length-1);
    //     operandsArray.splice(operandsArray.length-1);
    //     console.log(operatorsArray);
    // }
    while ((operatorsArray.includes('*') || operatorsArray.includes('/')) && operandsArray[operandsArray.length-1] !== '') {
        for (let i = 0; i < operatorsArray.length; i++){
            const currentOperator = operatorsArray[i];
            if (currentOperator == '*' || currentOperator == '/') {
                let calculation;
    
                if (operandsArray[i+1] === ''){
                    console.log('BREAK OUT');
                    break;
                } 
    
                if (currentOperator === '*') {
                    calculation = parseFloat(operandsArray[i]) * parseFloat(operandsArray[i+1]);
                } else if (currentOperator === '/') {
                    calculation = parseFloat(operandsArray[i]) / parseFloat(operandsArray[i+1]);
                }
           
                operandsArray[i] = calculation;
                operandsArray.splice(i+1,1);
                operatorsArray.splice(i,1);
                break;
            }
        }
    }
    
    let result = parseFloat(operandsArray[0]);
   
    operandsArray.shift();
    const length = operandsArray.length;
    for (let i = 0; i < length; i++){

        if (operandsArray[0] === '') return result;
        const currentOperand = parseFloat(operandsArray[0]);

        operandsArray.shift();
        const currentOperator = operatorsArray[0];

        operatorsArray.shift();

        switch (currentOperator) {
            case '+': {result += currentOperand; break}
            case '-': {result -= currentOperand; break}
            case '*': {result *= currentOperand; break}
            case '/': {result /= currentOperand; break}
        }
    }

    //Remove unnesseccary decimal point
    if (result.toString().split('.')[1]) {
        const decimal = result.toString().split('.')[1];
        let toFixed;
        let repeat = -1;
        for (let i = 0; i < decimal.length; i++){
            if (i > 0 && decimal[i] == decimal[i-1]) repeat++;
            if (repeat > 3) break;
            if (parseInt(decimal[i]) > 0 && parseInt(decimal[i]) < 9) {
                toFixed = i+1;
            }
        }
        if (toFixed) {
            result = result.toFixed(toFixed);
        }
    }

    return result;
}

function isOperator(value) {
    return (value === '+' || value === '-' || value === '*' || value === '/');
}
function clearStatement() {
    outputStatement.innerHTML = '';
}

function convertButtonKey(key) {
    switch(key) {
        case button1: {return '1';}
        case button2: {return '2';}
        case button3: {return '3';}
        case button4: {return '4';}
        case button5: {return '5';}
        case button6: {return '6';}
        case button7: {return '7';}
        case button8: {return '8';}
        case button9: {return '9';}
        case button0: {return '0';}
        case buttonDot: {return '.';}
        case buttonPlus: {return '+';}
        case buttonMinus: {return '-';}
        case buttonMultiply: {return '*';}
        case buttonDivide: {return '/';}
    }
}