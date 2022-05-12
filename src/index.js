/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
import ru from './jsLang/ru.js';
import en from './jsLang/en.js';

export default { ru, en };

let shiftState = false;
let capsState = false;
let lang = localStorage.getItem('lang') || 'en';
function addDiv() {
  const body = document.querySelector('body');
  const div = document.createElement('div');
  div.classList.add('window');
  body.append(div);
  const div2 = document.createElement('div');
  div2.classList.add('keyboard');
  body.append(div2);
  const div3 = document.createElement('div');
  div3.classList.add('language');
  body.append(div3);
  addTextarea(div);
  addKeyboard(div2);
  addP(div3);
}
addDiv();

function addTextarea(div) {
  const textarea = document.createElement('textarea');
  textarea.classList.add('window__input');
  div.append(textarea);
}
function addKeyboard(div2) {
  const divKeyboard = document.createElement('div');
  divKeyboard.classList.add('keyboard__container');
  div2.append(divKeyboard);
  const divKeyboardCont = document.createElement('div');
  divKeyboardCont.classList.add('keyboard__button');
  divKeyboard.append(divKeyboardCont);
  addButton(divKeyboardCont);
}
function addP(div3) {
  const p = document.createElement('p');
  p.innerHTML = 'Для переключения языка комбинация: Left Shift + Left Alt или кнопка EN/RU';
  div3.append(p);
}
function addButton(divKeyboardCont) {
  for (let i = 0; i < en.length; i += 1) {
    const button = document.createElement('button');
    button.classList.add('button__key');
    button.dataset.code = en[i].code;
    if (en[i].class !== '') {
      button.classList.add(en[i].class);
    }
    button.innerHTML = getButton(i);
    divKeyboardCont.append(button);
  }
}
function getButton(i) {
  if (lang === 'en') {
    if ((shiftState === true || capsState === true)) {
      return en[i].shift;
    } else {
      return en[i].small;
    }
  }

  if (lang === 'ru') {
    if ((shiftState === true || capsState === true)) {
      return ru[i].shift;
    } else {
      return ru[i].small;
    }
  }
}
function switchLang() {
  if (lang === 'en') {
    lang = 'ru';
  } else {
    lang = 'en';
  }
  localStorage.setItem('lang', lang);
}
function restart() {
  const but = document.querySelectorAll('button');
  for (let i = 0; i < en.length; i += 1) {
    but[i].innerHTML = getButton(i);
  }
}
function getCodeClickButton(code) {
  let index = 0;
  for (let i = 0; i < en.length; i += 1) {
    if (en[i].code === code) {
      index = i;
      break;
    }
  }
  return getButton(index);
}

function addListeners() {
  document.addEventListener('mouseup', (event) => onMouseUp(event));
  document.addEventListener('keydown', (event) => onKeyDown(event));
  document.addEventListener('keyup', (event) => onKeyUp(event));
  document.addEventListener('mousedown', (event) => onMouseDown(event));
}
addListeners();

function onMouseDown(event) {
  const inputText = document.querySelector('textarea');
  let code = '';
  if (event.stopPropagation) {
    event.stopPropagation();
  }
  inputText.focus();
  if (event.target.tagName === 'BUTTON') {
    code = event.target.dataset.code;
    event.target.classList.add('active');
  }
  if (code !== '') {
    if (code === 'ShiftLeft' || code === 'ShiftRight') {
      if (capsState === false) {
        shiftState = true;
        restart();
      }
      if (capsState === true) {
        shiftState = false;
        capsState = false;
        restart();
      }
    }
    if (code === 'CapsLock') {
      capsState = !capsState;
      restart();
    }
    if ((event.code === 'ShiftLeft' && event.altKey) || (event.code === 'AltLeft' && event.shiftKey)) {
      switchLang();
      restart();
    }
    if (code === 'lang') {
      switchLang();
      restart();
    }
  }
  event.preventDefault();
  let cursorPos = inputText.selectionStart;
  const left = inputText.value.slice(0, cursorPos);
  const right = inputText.value.slice(cursorPos);
  const fnButton = {
    Tab: () => {
      inputText.value = `${left}\t${right}`;
    },
    ArrowLeft: () => {
      cursorPos = cursorPos - 1 >= 0 ? cursorPos - 1 : 0;
    },
    ArrowRight: () => {
      cursorPos += 1;
    },
    ArrowUp: () => {
      const fromLeft = inputText.value.slice(0, cursorPos).match(/(\n).*$(?!\1)/g) || [[1]];
      cursorPos -= fromLeft[0].length;
    },
    ArrowDown: () => {
      const fromLeft = inputText.value.slice(cursorPos).match(/^.*(\n).*(?!\1)/) || [[1]];
      cursorPos += fromLeft[0].length;
    },
    Enter: () => {
      inputText.value = `${left}\n${right}`;
      cursorPos += 1;
    },
    Delete: () => {
      inputText.value = `${left}${right.slice(1)}`;
    },
    Backspace: () => {
      inputText.value = `${left.slice(0, -1)}${right}`;
      cursorPos -= 1;
    },
    Space: () => {
      inputText.value = `${left} ${right}`;
      cursorPos += 1;
    },
    ShiftLeft: () => {
      inputText.value = `${left}${right}`;
    },
    ShiftRight: () => {
      inputText.value = `${left}${right}`;
    },
    CapsLock: () => {
      inputText.value = `${left}${right}`;
    },
    AltLeft: () => {
      inputText.value = `${left}${right}`;
    },
    ControlLeft: () => {
      inputText.value = `${left}${right}`;
    },
    ControlRight: () => {
      inputText.value = `${left}${right}`;
    },
    AltRight: () => {
      inputText.value = `${left}${right}`;
    },
    lang: () => {
      inputText.value = `${left}${right}`;
    },
  };

  if (fnButton[code]) {
    fnButton[code]();
  } else if (code) {
    cursorPos += 1;
    inputText.value = `${left}${getCodeClickButton(code) || ''}${right}`;
  }
  inputText.setSelectionRange(cursorPos, cursorPos);
}
function onMouseUp(event) {
  let code = '';
  if (event.target.tagName === 'BUTTON') {
    code = event.target.dataset.code;
    event.target.classList.remove('active');
  }
  if (code === 'ShiftLeft' || code === 'ShiftRight') {
    if (shiftState === false) {
      shiftState = true;
      capsState = true;
      restart();
    }
    if (shiftState === true) {
      shiftState = false;
      restart();
    }
  }
}
function onKeyDown(event) {
  const inputText = document.querySelector('textarea');
  if (event.stopPropagation) {
    event.stopPropagation();
  }
  inputText.focus();

  const buto = document.querySelector(`button[data-code=${event.code}]`);
  buto.classList.add('active');
  if (event.type === 'keydown') {
    event.preventDefault();
  }
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    if (capsState === false) {
      shiftState = true;
      restart();
    }
    if (capsState === true) {
      shiftState = false;
      capsState = false;
      restart();
    }
  }
  if ((event.code === 'ShiftLeft' && event.altKey) || (event.code === 'AltLeft' && event.shiftKey)) {
    switchLang();
    restart();
  }
  if (event.code === 'CapsLock') {
    capsState = !capsState;
    restart();
  }
  event.preventDefault();
  let cursorPos = inputText.selectionStart;
  const left = inputText.value.slice(0, cursorPos);
  const right = inputText.value.slice(cursorPos);

  const fnButton = {
    Tab: () => {
      inputText.value = `${left}\t${right}`;
    },
    ArrowLeft: () => {
      cursorPos = cursorPos - 1 >= 0 ? cursorPos - 1 : 0;
    },
    ArrowRight: () => {
      cursorPos += 1;
    },
    ArrowUp: () => {
      const fromLeft = inputText.value.slice(0, cursorPos).match(/(\n).*$(?!\1)/g) || [[1]];
      cursorPos -= fromLeft[0].length;
    },
    ArrowDown: () => {
      const fromLeft = inputText.value.slice(cursorPos).match(/^.*(\n).*(?!\1)/) || [[1]];
      cursorPos += fromLeft[0].length;
    },
    Enter: () => {
      inputText.value = `${left}\n${right}`;
      cursorPos += 1;
    },
    Delete: () => {
      inputText.value = `${left}${right.slice(1)}`;
    },
    Backspace: () => {
      inputText.value = `${left.slice(0, -1)}${right}`;
      cursorPos -= 1;
    },
    Space: () => {
      inputText.value = `${left} ${right}`;
      cursorPos += 1;
    },
    ShiftLeft: () => {
      inputText.value = `${left}${right}`;
    },
    ShiftRight: () => {
      inputText.value = `${left}${right}`;
    },
    CapsLock: () => {
      inputText.value = `${left}${right}`;
    },
    AltLeft: () => {
      inputText.value = `${left}${right}`;
    },
    ControlLeft: () => {
      inputText.value = `${left}${right}`;
    },
    ControlRight: () => {
      inputText.value = `${left}${right}`;
    },
    AltRight: () => {
      inputText.value = `${left}${right}`;
    },
  };
  if (fnButton[event.code]) {
    fnButton[event.code]();
  } else {
    cursorPos += 1;
    inputText.value = `${left}${getCodeClickButton(event.code) || ''}${right}`;
  }
  inputText.setSelectionRange(cursorPos, cursorPos);
}
function onKeyUp(event) {
  const buto = document.querySelector(`button[data-code=${event.code}]`);
  buto.classList.remove('active');
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    if (shiftState === false) {
      shiftState = true;
      capsState = true;
      restart();
    }
    if (shiftState === true) {
      shiftState = false;
      restart();
    }
  }
}
