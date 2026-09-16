window.onload = function() {
  let a = '';
  let b = '';
  let expressionResult = '';
  let selectedOperation = null;

  const outputElement = document.getElementById("result");
  const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

  function getCurrentValue() {
    return selectedOperation ? b : a;
  }

  function setCurrentValue(value) {
    if (selectedOperation) b = value;
    else a = value;
    outputElement.innerHTML = value === '' ? '0' : value;
  }

  function onDigitButtonClicked(digit) {
    let value = getCurrentValue();
    if (digit === '.' && value.includes('.')) return;
    if (digit === '.' && value === '') value = '0';
    value += digit;
    setCurrentValue(value);
  }

  digitButtons.forEach(button => {
    button.onclick = function() {
      onDigitButtonClicked(button.innerHTML);
    };
  });

  document.getElementById("btn_op_mult").onclick = function() {
    if (a === '') return; selectedOperation = 'x';
  };
  document.getElementById("btn_op_plus").onclick = function() {
    if (a === '') return; selectedOperation = '+';
  };
  document.getElementById("btn_op_minus").onclick = function() {
    if (a === '') return; selectedOperation = '-';
  };
  document.getElementById("btn_op_div").onclick = function() {
    if (a === '') return; selectedOperation = '/';
  };

  document.getElementById("btn_op_clear").onclick = function() {
    a = ''; b = ''; selectedOperation = null; expressionResult = '';
    outputElement.innerHTML = 0;
  };

  document.getElementById("btn_op_sign").onclick = function() {
    const value = getCurrentValue();
    if (value === '') return;
    setCurrentValue(String(Number(value) * -1));
  };

  document.getElementById("btn_op_percent").onclick = function() {
    const value = getCurrentValue();
    if (value === '') return;
    setCurrentValue(String(Number(value) / 100));
  };

  document.getElementById("btn_op_equal").onclick = function() {
    if (a === '' || b === '' || !selectedOperation) return;
    switch(selectedOperation) {
      case 'x': expressionResult = (+a) * (+b); break;
      case '+': expressionResult = (+a) + (+b); break;
      case '-': expressionResult = (+a) - (+b); break;
      case '/':
        if ((+b) === 0) {
          outputElement.innerHTML = 'Ошибка';
          a = ''; b = ''; selectedOperation = null; return;
        }
        expressionResult = (+a) / (+b); break;
      default: return;
    }
    a = String(Number.isInteger(expressionResult) ? expressionResult : Number(expressionResult.toFixed(10)));
    b = '';
    selectedOperation = null;
    outputElement.innerHTML = a;
  };

  const specialButton = document.getElementById("btn_op_special");
  if (specialButton) specialButton.onclick = function() {
    const value = getCurrentValue();
    if (value === '') return;
    setCurrentValue(String(Number(value) * 1.10));
  };
};
