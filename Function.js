class Calculator {
  constructor(previousinputTextElement, currentinputTextElement) {
    this.previousinputTextElement = previousinputTextElement
    this.currentinputTextElement = currentinputTextElement
    this.clear()
  }

  clear() {
    this.currentinput = ''
    this.previousinput = ''
    this.operation = undefined
  }

  delete() {
    this.currentinput = this.currentinput.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentinput.includes('.')) return
    this.currentinput = this.currentinput.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentinput === '') return
    if (this.previousinput !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousinput = this.currentinput
    this.currentinput = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousinput)
    const current = parseFloat(this.currentinput)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentinput = computation
    this.operation = undefined
    this.previousinput = ''
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
    this.currentinputTextElement.innerText =
      this.getDisplayNumber(this.currentinput)
    if (this.operation != null) {
      this.previousinputTextElement.innerText =
        `${this.getDisplayNumber(this.previousinput)} ${this.operation}`
    } else {
      this.previousinputTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousinputTextElement = document.querySelector('[data-previous-input]')
const currentinputTextElement = document.querySelector('[data-current-input]')

const calculator = new Calculator(previousinputTextElement, currentinputTextElement)

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