import ru from './jsLang/ru.js';
import en from './jsLang/en.js';

export default { ru, en };

const input = document.querySelector(".window__input");
const capsLock = document.querySelector(".button__caps");

input.onkeypress = function (event) {
    console.log("onkeypress")
    console.log("charCode:   " + event.charCode);
    console.log("code:  " + event.code);
    console.log("key:  " + event.key);
    console.log("keyCode:  " + event.keyCode);
    console.log(event)
}

input.onkeydown = function (event) {
    console.log("onkeydown")
    console.log("charCode:   " + event.charCode);
    console.log("code:  " + event.code);
    console.log("key:  " + event.key);
    console.log("keyCode:  " + event.keyCode);
    console.log(event)


}
input.onkeyup = function (event) {
    console.log("onkeyup")
    console.log("charCode:   " + event.charCode);
    console.log("code:  " + event.code);
    console.log("key:  " + event.key);
    console.log("keyCode:  " + event.keyCode);
    console.log(event)


}