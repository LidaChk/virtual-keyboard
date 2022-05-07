import Button from './btn';
import layouts from './layouts';
import keyboardMap from './keyboardmap';

const textarea = document.querySelector('.form__input');

export default class Keyboard {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('keyborad-container');
    this.btns = [];
    this.capsed = false;
    this.shifted = false;
    this.lang = 'Eng';

    Object.keys(keyboardMap).forEach((key) => {
      const line = document.createElement('div');
      line.classList.add('line-container');
      line.classList.add(`keyboard-${key}`);
      keyboardMap[key].forEach((k) => {
        const btnKey = new Button(...k.split(':'));
        line.appendChild(btnKey.element);
        this.btns.push(btnKey);
      });
      this.element.appendChild(line);
    });
    document.querySelector('.components').appendChild(this.element);
  }

  activatekey(code) {
    // this.element.querySelector(`#${code}`).classList.add('btn--active');
    const btn = this.btns.find((b) => b.code === code);
    if (btn) btn.element.classList.add('btn--active');
    if (code === 'CapsLock' && !btn.isPressed) {
      this.capsed = !this.capsed;
      btn.element.classList.toggle('capsed');
      btn.isPressed = true;
      this.initLang();
    }
    if (code.slice(0, 5) === 'Shift' && !btn.isPressed) {
      this.shifted = !this.shifted;
      btn.isPressed = true;
      this.initLang();
    }
  }

  deactivatekey(code) {
    // this.element.querySelector(`#${code}`).classList.remove('btn--active');
    const btn = this.btns.find((b) => b.code === code);
    if (btn) btn.element.classList.remove('btn--active');
    if (code === 'CapsLock') {
      btn.isPressed = false;
    }
    if (code.slice(0, 5) === 'Shift' && btn.isPressed) {
      this.shifted = !this.shifted;
      btn.isPressed = false;
      this.initLang();
    }
  }

  initLang() {
    const lay = layouts.find((l) => l.lang === this.lang && l.shifted === this.shifted).layout;
    console.log(this.shifted);
    this.btns.filter((b) => b.type === 'key').forEach((b) => {
      if (lay[b.code] !== undefined) {
        if (this.capsed && this.shifted && b.code.slice(0, 3) === 'Key') { b.changeLabel(lay[b.code].toLowerCase()); } else if (this.capsed && !this.shifted && b.code.slice(0, 3) === 'Key') { b.changeLabel(lay[b.code].toUpperCase()); } else b.changeLabel(lay[b.code]);
      }
    });
  }
}

const keyBoard = new Keyboard();

keyBoard.initLang();

textarea.addEventListener('keydown', (e) => {
  keyBoard.activatekey(e.code);

  e.preventDefault();
});
textarea.addEventListener('keyup', (e) => {
  keyBoard.deactivatekey(e.code);

  e.preventDefault();
});
