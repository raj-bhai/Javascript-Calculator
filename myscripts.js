let history_log = []
this.history_log = history_log

let savedData = []
this.savedData = savedData


class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }


  clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    let prev = parseFloat(this.previousOperand)
    let current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
		this.x= '+'
        break
      case '-':
        computation = prev - current
		this.x = '-'
        break
      case '*':
        computation = prev * current
		this.x = '*'
        break
      case '÷':
        computation = prev / current
		this.x = '/'
        break
      default:
        return
    } 
	this.prev = prev
	this.current= current
	this.computation = computation
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
    historyLog(){
        //let history_log = []
        this.history_log = history_log
        if (this.history_log.length > 55) {
            this.history_log.splice(0, 6)
            this.history_log.push(this.prev)
            this.history_log.push(this.x)
            this.history_log.push(this.current)
            this.history_log.push("=")
            this.history_log.push(this.computation)
            this.history_log.push(",")
        }
        else {
            this.history_log.push(this.prev)
            this.history_log.push(this.x)
            this.history_log.push(this.current)
            this.history_log.push("=")
            this.history_log.push(this.computation)
            this.history_log.push(",")
        }

  }
  historyLogDisply() {
	this.currentOperandTextElement.innerText = this.history_log.join('')
}

    saveButton() { 
        this.compute()
        this.savedData = savedData

        this.savedData.push(this.prev)
        this.savedData.push(this.x)
        this.savedData.push(this.current)
        this.savedData.push("=")
        this.savedData.push(this.computation)
        this.savedData.push(",")

	this.currentOperandTextElement.innerText = "Saved Succesfully"
}

viewSavedButton(){
    this.currentOperandTextElement.innerText = this.savedData.join('')
}

}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const history_logButton = document.querySelector('[data-history_log]')
const saveButton = document.querySelector('[data-save]')
const viewSavedButton = document.querySelector('[data-viewSaved]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.historyLog()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

history_logButton.addEventListener('click', button => {
 calculator.historyLogDisply()
})
 
 saveButton.addEventListener('click', button => {
    calculator.saveButton()
})

 viewSavedButton.addEventListener('click', button => {
    calculator.viewSavedButton()
})