const disp = document.querySelector("#Disp");
const ans = document.querySelector("#Ans");
const keyp = document.querySelector("#keypad");
const keyp2 = document.getElementById('keypad2');
const cells = [')', 'exp(x)', 'C', 'Del', 'xⁿ', 'x²', '√(x)', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '1/x', '0', '.', '='];
let opps=['%','/','*','-','+',]
let buf = '';
let dbuf = '';

disp.textContent = "0";

function create() {
    cells.forEach((cell, index) => {
        const ele = document.createElement('div');
        ele.classList.add(cells[index] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] ? 'numbers' : 'operators');
        ele.id = cells[index];
        keyp.append(ele);
        ele.innerHTML = cells[index];
        ele.addEventListener('click', op);
    });
}

create();

function op(e) {
    if (e.target.id === '=') {
        try {
            console.log(buf)
            let result = evaluateExpression(buf);
            ans.innerHTML = result;
        } catch (error) {
            ans.innerHTML = 'Error';
        }
    } else if (e.target.id === 'C') {
        clearDisplay();
    } else if (e.target.id == 'Del') {
        deleteLastChar();
    } else {
        updateBuffer(e.target.id);
    }
}

function evaluateExpression(expression) {
    return Function(`'use strict'; return (${expression})`)();
}

function clearDisplay() {
    disp.innerHTML = '0';
    ans.innerHTML = '0';
    dbuf = '';
    buf = '';
}

function deleteLastChar() {
    dbuf = dbuf.slice(0, -1);
    buf = buf.slice(0, -1);
    disp.innerHTML = dbuf || '0';
}

function updateBuffer(input) {
    if (input === '1/x') {
        dbuf += '1/(';
        buf += '1/(' ;
    } else if (input === 'exp(x)') {
        if (dbuf === '' || opps.includes(dbuf[dbuf.length - 1])) {
            dbuf += 'exp(';
            buf += 'Math.exp(';
        } else {
            dbuf += 'exp(';
            buf += ')*Math.exp(';
        }
    } else if (input === 'xⁿ') {
        dbuf = buf + '^';
        buf += '^';
    } else if (input === 'x²') {
        // Find the index of the last operator
        let lastOperatorIndex = Math.max(dbuf.lastIndexOf('+'), dbuf.lastIndexOf('-'), dbuf.lastIndexOf('*'), dbuf.lastIndexOf('/'), dbuf.lastIndexOf('%'));
        // Extract the last term
        let lastTerm = buf.substring(lastOperatorIndex + 1);
        // Replace the last term with its squared value
        buf = buf.substring(0, lastOperatorIndex + 1) + `(${lastTerm})**2`;
        dbuf = buf;
    } else if (input === '√(x)') {
        if (dbuf === '' || opps.includes(dbuf[dbuf.length - 1])) {
            dbuf += '√(';
            buf += 'Math.sqrt(';
        } else {
            dbuf += '√';
            buf += '**0.5';
        }
    } else if (input === '%') {
        if (dbuf.includes('(')) {
            dbuf += ')';
            buf += ')';
        }
    } else if (input === ')') {
        if (dbuf.includes('(')) {
            dbuf += ')';
            buf += ')';
        }
    } else {
        dbuf += input;
        buf += input;
    }
    disp.innerHTML = dbuf;
}


