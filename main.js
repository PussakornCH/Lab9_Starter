// main.js
// Step 4 Custom error
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// Step 5: Global error handler
// Global error handler
window.onerror = function (message, source, lineno, colno, error) {
  console.error('Global Error Caught:', {
    message: message,
    source: source,
    lineno: lineno,
    colno: colno,
    error: error
  });

  // TrackJS will automatically capture this error
  if (window.TrackJS) {
    TrackJS.track(error);
  }
};

let form = document.querySelector('form');
form.addEventListener('submit', e => {
  e.preventDefault();
  let output = document.querySelector('output');
  let firstNum = document.querySelector('#first-num').value;
  let secondNum = document.querySelector('#second-num').value;
  let operator = document.querySelector('#operator').value;
  TrackJS.track(error);
  // Step 3 Trying Try/Catch
  // try to check input is vaild.
  try {
    if (firstNum === '' || secondNum === '') {
      throw new ValidationError('Both numbers must be provided');
    }
    if (isNaN(firstNum) || isNaN(secondNum)) {
      throw new ValidationError('Both inputs must be valid numbers');
    }
    if (operator === "/" && secondNum === "0") {
        throw new Error("The denominator cannot be 0");
    }
    output.innerHTML = eval(`${firstNum} ${operator} ${secondNum}`);
  }
  // catch the error that was throw from try
  catch (error) {
    if (error instanceof ValidationError) {
      console.error('Validation Error:', error.message);
    } else {
      console.error('Unexpected Error:', error.message);
    }
    output.innerHTML = 'Error: ' + error.message;
  } 
  // display the message in console indicate the end
  finally {
    console.log('Calculation attempt finished');
  }
});

let errorBtns = Array.from(document.querySelectorAll('#error-btns > button'));

// Start your code here
// You may move this JS to another file if you wish
// Adding event listeners for console methods
document.getElementById('log-btn').addEventListener('click', () => console.log('Console Log Demo'));
document.getElementById('error-btn').addEventListener('click', () => console.error('Console Error Demo'));
document.getElementById('count-btn').addEventListener('click', () => console.count('Console Count Demo'));
document.getElementById('warn-btn').addEventListener('click', () => console.warn('Console Warn Demo'));
document.getElementById('assert-btn').addEventListener('click', () => {
  const number = 2;
  console.assert(number === 3, { number: number, errorMsg: 'The number does not equal 3' });
});
document.getElementById('clear-btn').addEventListener('click', () => console.clear());
document.getElementById('dir-btn').addEventListener('click', () => console.dir(document.body));
document.getElementById('dirxml-btn').addEventListener('click', () => console.dirxml(document.body));
document.getElementById('group-start-btn').addEventListener('click', () => {
  console.group('Console Group');
  console.log('Inside Group');
});
document.getElementById('group-end-btn').addEventListener('click', () => console.groupEnd('Console Group'));
document.getElementById('table-btn').addEventListener('click', () => console.table([{ name: "Alice", age: 25 }, { name: "Bob", age: 30 }]));
document.getElementById('start-timer-btn').addEventListener('click', () => console.time('Timer'));
document.getElementById('end-timer-btn').addEventListener('click', () => console.timeEnd('Timer'));
document.getElementById('trace-btn').addEventListener('click', () => console.trace('Console Trace Demo'));
document.getElementById('global-error-btn').addEventListener('click', () => {
  throw new Error('Global Error Demo');
});
