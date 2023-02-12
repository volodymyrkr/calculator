let firstNumber = '';
let secondNumber = '';
let action = '';

let state = 0; // 0 - input first number, 1 - input second number, 2 - view result

const controlsElement = document.getElementById("controls");
controlsElement.addEventListener("click", onClickControls);

function onClickControls(e) {
  console.log(e.target.innerText);
  // TODO: fix handling clicks on parent element
  if ("0123456789.".indexOf(e.target.innerText) > -1) {
    if (state === 0) firstNumber += e.target.innerText;
    if (state === 1) secondNumber += e.target.innerText;
    if (state === 2) {
      state = 0;
      firstNumber = e.target.innerText;
    }
  }
  if ("-".indexOf(e.target.innerText) > -1) {
    if (state === 0 && firstNumber === '') {
      firstNumber = '-';
    } else if (state === 1 && secondNumber === '') {
      secondNumber = '-';
    } else {
      action = e.target.innerText;
      state = 1;
    }
  }
  if ("+/*%".indexOf(e.target.innerText) > -1) {
    action = e.target.innerText;
    state = 1;
  }
  if ("=".indexOf(e.target.innerText) > -1) {
    if (action === '%') {
      firstNumber = (eval(`${firstNumber}/${secondNumber}*100`)).toFixed(2);
    } else {
      firstNumber = (eval(`${firstNumber}${action}${secondNumber}`)).toString();
    }
    secondNumber = '';
    action = '';
    state = 2;
  }
  if ("C".indexOf(e.target.innerText) > -1) {
    if (state === 0 || state === 2) firstNumber = '';
    if (state === 1) secondNumber = '';
  }

  if ("AC".indexOf(e.target.innerText) > -1) {
    firstNumber = '';
    secondNumber = '';
    action = '';
    state = 0;
  }

  updateDisplay();
}

function updateDisplay() {
  if (state === 0 || state === 2) {
    document.getElementById("display").innerText = firstNumber === '' ? '0' : firstNumber;
  }
  if (state === 1) {
    document.getElementById("display").innerText = secondNumber === '' ? '0' : secondNumber;
  }
}

updateDisplay();