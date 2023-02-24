import './Сalculator.scss';

class Calculator {
  public render(): HTMLElement {
    const calcString = `
    <article class="calculator">

      <form id="screen">
        <input id="equation" name="equation" type="text" value="" 
        onkeyup="this.value = this.value.replace(/[^\.\+\-\\d]/g,'');" readonly="readonly">
        <output for="equation" id="result" name="result"></output>
      </form>

      <button id="zero" class="num button" value="0">0</button>
      <button id="one" class="num button" value="1">1</button>
      <button id="two" class="num button" value="2">2</button>
      <button id="three" class="num button" value="3">3</button>
      <button id="four" class="num button" value="4">4</button>
      <button id="five" class="num button" value="5">5</button>
      <button id="six" class="num button" value="6">6</button>
      <button id="seven" class="num button" value="7">7</button>
      <button id="eight" class="num button" value="8">8</button>
      <button id="nine" class="num button" value="9">9</button>
      <button id="dot" class="num button" value=".">.</button>

      <button id="divide" class="operator button" value="/">/</button>
      <button id="multiply" class="operator button" value="*">*</button>
      <button id="add" class="operator button" value="+">+</button>
      <button id="subtract" class="operator button" value="-">-</button>

      <button id="equal" class="operator" value="=">=</button>
      <button id="all-clear" class="clear">AC</button>
      <button id="del" class="clear">DEL</button>
    </article>
    `;

    const calculatorElem = this.convertFromStringToHTML(calcString);

    this.calc(calculatorElem);

    return calculatorElem;
  }

  private convertFromStringToHTML(htmlString: string): HTMLElement {
    const parentDiv = document.createElement('div');
    parentDiv.innerHTML = htmlString.trim();

    return parentDiv.firstChild as HTMLElement;
  }

  private calc(calculatorElem: HTMLElement) {
    const expression = calculatorElem.querySelector('#equation') as HTMLInputElement;
    const result = calculatorElem.querySelector('#result') as HTMLOutputElement;
    const buttons = calculatorElem.querySelectorAll('.button');

    for (let button of buttons) {
      button.addEventListener('click', (e) => {
        this.calculateResult(e, expression, result);
      });
    }

    const equal = calculatorElem.querySelector('#equal');
    equal?.addEventListener('click', () => {
      expression.value = result.value;
      result.value = '';
    });

    const AC = calculatorElem.querySelector('#all-clear');
    AC?.addEventListener('click', () => {
      expression.value = '';
      result.value = '';
    });

    const DEL = calculatorElem.querySelector('#del');
    DEL?.addEventListener('click', () => {
      expression.value = expression.value.slice(0, -1);

      const len = expression.value.length;
      const lastChar = expression.value[len - 1];

      if (['+', '-', '*', '/'].includes(lastChar)) {
        result.innerText = eval(expression.value.slice(0, -1));
      } else {
        const ans = eval(expression.value);
        if (ans === undefined) result.innerText = '';
        else result.innerText = ans;
      }
    });
  }

  private calculateResult(event: Event, expression: HTMLInputElement, result: HTMLOutputElement) {
    if (event.target) {
      expression.value += (event.target as HTMLButtonElement).value;

      if (!(event.target as HTMLButtonElement).classList.contains('operator')) {
        result.innerText = eval(expression.value);
      }
    }
  }
}

export default Calculator;
