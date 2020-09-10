// Selectors

const numberButtons = document.querySelectorAll('[data-number]');
const depositButton = document.querySelector('[data-deposit]');
const withdrawButton = document.querySelector('[data-withdraw]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


// Atm constructor 

class Atm {
    // gives atm constructor the text elements that were working with which is the prev and curr oper
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement; // Assigning this will allow us to access these variables in the rest of the constructor
        this.currentOperandTextElement = currentOperandTextElement;
        this.clearPrevBal(); // Need to clear balance first in order to use 
        this.currOperand = 'Your Balance is, $1000'; // Set balance to 1000
    }

    // Clear function
    clearPrevBal() {
        this.prevOperand = '';
        this.operation = undefined;
    }


    // Delete function 
    delete() {
        this.prevOperand = this.prevOperand.slice(0, this.prevOperand.length - 1);

    }
    // Choose operation function
    chooseOperation(operation) {
        if(this.prevOperand !== '') { // Basically saying if there is no number in the previous operand there is no reason to do any operation 
            this.operation = operation;
        }
    }


    // Append Number function
    appendNumber(number) {
        if(number === '.' && this.prevOperand.includes('.')) return // If there is a decimal already dont give it another decimal 
        this.prevOperand = this.prevOperand.toString() + number.toString() // Changing the numbers to strings and adding them together or else if they are numbers itll be 2 + 8 = 10 instead of 28
    }

     // Compute function 
    compute() {
        if(this.prevOperand !== '' && this.currOperand !== '') { // Checks if both areas are not empty 

            const preOper = parseFloat(this.prevOperand); // Change the inputs from strings to numbers 
            if(preOper < 0) {
                this.currOperand = 'Enter an amount greater than 0'; // Check if number is negative 
            } 
            const searchParam = '$';
            const indexOfParam = this.currOperand.indexOf(searchParam);
            const currOper = parseFloat(this.currOperand.slice(indexOfParam + 1)); 
            // 3 lines above is to find the $ sign and delete everything before so we can parse float a number and not a string 

            if(this.operation === 'Deposit') {
                this.currOperand = currOper + preOper;
                this.currOperand = `Your new Balance is $${this.currOperand}`;
                this.prevOperand = '';

            } else if (this.operation === 'Withdraw') {
                if (preOper > currOper) {
                    this.currOperand = `ERROR! Your balance is now $0`;
                    this.prevOperand = '';
                    return;
                }
                this.currOperand = currOper - preOper;
                this.currOperand = `Your new Balance is $${this.currOperand}`;
                this.prevOperand = '';
               
            }

        }
    }

    // Update display function 
    updateDisplay() {
        this.previousOperandTextElement.innerText = this.prevOperand;
        this.currentOperandTextElement.innerText = this.currOperand;
    
    }

}

//  assign constructor to a variable and call the constructor 
const atm = new Atm(previousOperandTextElement,currentOperandTextElement);


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        atm.appendNumber(button.innerText)
        atm.updateDisplay()
    })
})

allClearButton.addEventListener('click', () => {
    atm.clearPrevBal();
    atm.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    atm.delete();
    atm.updateDisplay();
})

depositButton.addEventListener('click', () => {
    atm.chooseOperation(depositButton.innerText);
    atm.compute();
    atm.updateDisplay();
})

withdrawButton.addEventListener('click', () => {
    atm.chooseOperation(withdrawButton.innerText);
    atm.compute();
    atm.updateDisplay();
    
})