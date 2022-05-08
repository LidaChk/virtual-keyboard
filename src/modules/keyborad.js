import Button from './btn';
import layouts from './layouts';
import keyboardMap from './keyboardmap';
import bodyTemplate from './templates';

export default class Keyboard {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('keyborad-container');
    this.btns = [];
    this.capsed = false;
    this.shifted = false;
    this.alted = false;
    this.lang = 'Eng';
    this.langs = ['Eng', 'Rus'];

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

    document.body.innerHTML = bodyTemplate;
    this.textarea = document.querySelector('.form__input');

    document.querySelector('.components').appendChild(this.element);
    this.addEvents();
    console.log(this.btns);
  }

  addEvents() {
    document.addEventListener('click', () => { this.textarea.focus(); });

    this.element.addEventListener('click', (e) => {
      const key = e.target.closest('.btn');
      if (key) {
        this.activatekey(key.id);
        this.deactivatekey(key.id);
      }
    });

    this.textarea.addEventListener('keydown', (e) => {
      this.activatekey(e.code);

      e.preventDefault();
    });
    this.textarea.addEventListener('keyup', (e) => {
      this.deactivatekey(e.code);

      e.preventDefault();
    });
  }

  switchLang() {
    this.lang = this.langs.pop();
    this.langs.unshift(this.lang);
    console.log(this.langs);
  }

  activatekey(code) {
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
      if (this.alted) { this.switchLang(); }
      this.initLang();
    }
    if (code.slice(0, 3) === 'Alt' && !btn.isPressed) {
      this.alted = !this.alted;
      btn.isPressed = true;
      if (this.shifted) {
        this.switchLang();
        this.initLang();
      }
    }
  }

  deactivatekey(code) {
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
    if (code.slice(0, 3) === 'Alt' && btn.isPressed) {
      this.alted = !this.alted;
      btn.isPressed = false;
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
