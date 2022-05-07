import Button from './btn';

const winKey = `<span class="material-symbols-outlined">
keyboard_command_key
</span>`;
const ArrowLeft = `<span class="material-symbols-outlined">
arrow_back
</span>`;
const ArrowRight = `<span class="material-symbols-outlined">
arrow_forward
</span>`;
const ArrowDown = `<span class="material-symbols-outlined">arrow_downward
</span>`;
const ArrowUp = `<span class="material-symbols-outlined">
arrow_upward
</span>`;

const keyboardMap = {
  line1: ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace:Func:2:&#x2190;Backspace', 'Delete:Func:1:Del'],
  line2: ['Tab:Func:1.5:Tab&#x2194;', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash:Key:1.5', 'None'],
  line3: ['CapsLock:Func:1.75:CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter:Func:2.25:Enter&#x21B5;', 'None'],
  line4: ['ShiftLeft:Func:2.25:&#x21D1;Shift', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight:Func:1.75:&#x21D1;Shift', `ArrowUp:Arrow:1:${ArrowUp}`, 'None'],
  line5: ['ControlLeft:Func:1.5:Ctrl', `MetaLeft:Func:1:${winKey}`, 'AltLeft:Func:1:Alt', 'Space:Key:7.5', 'AltRight:Func:1:Alt', 'ControlRight:Func:1:Ctrl', `ArrowLeft:Arrow:1:${ArrowLeft}`, `ArrowDown:Arrow:1:${ArrowDown}`, `ArrowRight:Arrow:1:${ArrowRight}`],
};
const textarea = document.querySelector('.form__input');

export default class Keyboard {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('keyborad-container');

    Object.keys(keyboardMap).forEach((key) => {
      const line = document.createElement('div');
      line.classList.add('line-container');
      line.classList.add(`keyboard-${key}`);
      keyboardMap[key].forEach((k) => {
        const btnKey = new Button(...k.split(':'));
        line.appendChild(btnKey.element);
      });
      this.element.appendChild(line);
    });
    document.querySelector('.components').appendChild(this.element);
  }

  activatekey(code) {
    this.element.querySelector(`#${code}`).classList.add('btn--active');
  }

  deactivatekey(code) {
    this.element.querySelector(`#${code}`).classList.remove('btn--active');
  }
}

const keyBoard = new Keyboard();

textarea.addEventListener('keydown', (e) => {
  keyBoard.activatekey(e.code);

  // textarea.value += `'${e.code}',`;
  // e.preventDefault();
});
textarea.addEventListener('keyup', (e) => {
  keyBoard.deactivatekey(e.code);

  // textarea.value += e.code;
  // e.preventDefault();
});
