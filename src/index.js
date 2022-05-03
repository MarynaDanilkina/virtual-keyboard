import ru from './jsLang/ru.js';
import en from './jsLang/en.js';

export default { ru, en };
const addClass = ['', '', '', '', '', '', '', '', '', '', '', '', '', 'button__backspace', 'button__tab', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'button__caps', '', '', '', '', '', '', '', '', '', '', '', 'button__enter', 'button__shift', '', '', '', '', '', '', '', '', '', '', '', '', '', 'button__ctrl', '', '', 'button__space', '', 'button__ctrl', '', '', ''];
console.log(addClass.length)
console.log(en.length)
let shiftState = false;
let capsState = false;
let lang = 'en'


function addDiv() {
    const body = document.querySelector('body')
    let div = document.createElement('div');
    div.classList.add('window');
    body.append(div);
    let div2 = document.createElement('div');
    div2.classList.add('keyboard');
    body.append(div2);
    let div3 = document.createElement('div');
    div3.classList.add('language');
    body.append(div3);
    addTextarea(div);
    addKeyboard(div2);
    addP(div3);

}
addDiv()

function addTextarea(div) {
    let textarea = document.createElement('textarea');
    textarea.classList.add('window__input');
    div.append(textarea);
}
function addKeyboard(div2) {
    let divKeyboard = document.createElement('div');
    divKeyboard.classList.add('keyboard__container');
    div2.append(divKeyboard);
    let divKeyboardCont = document.createElement('div');
    divKeyboardCont.classList.add('keyboard__button');
    divKeyboard.append(divKeyboardCont);
    addButton(divKeyboardCont)
}
function addP(div3) {
    let p = document.createElement('p');
    p.innerHTML = 'Для переключения языка комбинация: Left Ctrl + Left Alt'
    div3.append(p);
}
function addButton(divKeyboardCont) {
    for (let i = 0; i < en.length; i++) {
        let button = document.createElement('button')
        button.classList.add('button__key');
        button.dataset.code = en[i].code;
        if (en[i].class !== '') {
            button.classList.add(en[i].class);

        }
        button.innerHTML = getButton(i)
        divKeyboardCont.append(button)
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
function getCodeClickButton(code) {
    let index = 0;
    for (let i = 0; i < en.length; i++) {
        if (en[i].code === code) {
            index = i;
            break;
        }
    }
    return getButton(index);
}
function addListeners() {
    document.addEventListener('mousedown', (event) => onMouseDown(event));
}
addListeners()


function onMouseDown(event) {
    let code = '';
    if (event.target.tagName === 'BUTTON') {
        code = event.target.dataset.code;
        console.log(code)
    }
    if (code !== '') {
        let textarea = document.querySelector('textarea')
        textarea.innerHTML += getCodeClickButton(code);
    }
}
